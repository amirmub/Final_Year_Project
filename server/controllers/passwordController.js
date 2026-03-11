const User = require("../models/userModel");
const crypto = require("crypto");
const sendEmail = require("../utils/email");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// this function is for logged in user and update their password
async function updatePassword(req, res) {
  const { currentPassword, newPassword, newPasswordConfirm } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!(await bcrypt.compare(currentPassword, user.password))) {
      return res.status(400).json({
        status: "fail",
        message: "Your current password is wrong",
      });
    }

    if (newPassword !== newPasswordConfirm) {
      return res.status(400).json({
        status: "fail",
        message: "Passwords do not match",
      });
    }

    user.password = await bcrypt.hash(newPassword, 12);
    user.passwordChangedAt = Date.now() - 1000;
    await user.save();

    // FORCE LOGOUT (ONLY THIS)
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return res.status(200).json({
      status: "success",
      message: "Password updated. Please login again.",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

// 1) User forgot password send email with reset link
async function forgotPassword(req, res) {
  const { email } = req.body;

  //  Validate email
  if (!email) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide your email address",
    });
  }

  // Find user
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User not found",
    });
  }

  // Generate reset token (RAW)
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Hash token and save to DB
  user.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  await user.save({ validateBeforeSave: false });

  // Frontend reset URL
 const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Reset Password</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f5f7fa; font-family: Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; padding:32px;">
            
            <!-- Greeting -->
            <tr>
              <td style="font-size:16px; color:#111;">
                <p>Hi <strong>${user.name || "Amir"}</strong>,</p>
                <p>
                  We received a request to reset your password for your
                  <strong>AMIR</strong> account.
                </p>
                <p>Click the button below to reset your password.</p>
              </td>
            </tr>

            <!-- Button -->
            <tr>
              <td align="center" style="padding:24px 0;">
                <a href="${resetURL}"
                  style="
                    background: linear-gradient(90deg, #6a7cff, #8b5cf6);
                    color: #ffffff;
                    padding: 14px 32px;
                    border-radius: 10px;
                    text-decoration: none;
                    font-weight: bold;
                    font-size: 16px;
                    display: inline-block;
                  ">
                  Reset Password
                </a>
              </td>
            </tr>

            <!-- Security Notice -->
            <tr>
              <td style="padding-top:16px;">
                <div style="
                  background:#fff4cc;
                  border-left:6px solid #f59e0b;
                  border-radius:8px;
                  padding:16px;
                  color:#92400e;
                ">
                  <p style="margin-top:0; font-weight:bold;">
                    ⏰ Important Security Notice:
                  </p>
                  <ul style="padding-left:20px; margin:0;">
                    <li>This link will expire in <strong>10 minutes</strong></li>
                    <li>If you didn't request this, please ignore this email</li>
                    <li>Your password will remain unchanged if you don't click the link</li>
                    <li>For security reasons, never share this link with anyone</li>
                  </ul>
                </div>
              </td>
            </tr>

            <!-- Fallback link -->
            <tr>
              <td style="padding-top:24px; font-size:14px; color:#555;">
                <p>
                  If the button doesn't work, copy and paste this link into your browser:
                </p>
                <p>
                  <a href="${resetURL}" style="color:#4f46e5; word-break: break-all;">
                    ${resetURL}
                  </a>
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;


  // Send email
  try {
    await sendEmail({
      email: user.email,
      subject: "Reset your password",
      html,
    });

    res.status(200).json({
      status: "success",
      message: "Reset link sent to email",
    });
  } catch (err) {
    // Rollback token if email fails
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    console.error(err);

    res.status(500).json({
      status: "error",
      message: "Email could not be sent",
    });
  }
}


// 2) User resets password using the token sent to their email
async function resetPassword(req, res) {
  const { password, passwordConfirm } = req.body;

  // Validate input
  if (!password || !passwordConfirm) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide password and passwordConfirm",
    });
  }

  if (password !== passwordConfirm) {
    return res.status(400).json({
      status: "fail",
      message: "Passwords do not match",
    });
  }

  // Hash token from URL
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  // Find valid user
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({
      status: "fail",
      message: "Token is invalid or has expired",
    });
  }

  // Hash password manually (MODEL HAS NO MIDDLEWARE)
  const hashedPassword = await bcrypt.hash(password, 12);

  user.password = hashedPassword;
  user.passwordConfirm = undefined;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.passwordChangedAt = Date.now() - 1000;

  await user.save({ validateBeforeSave: false });

  // Optional: auto-login
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_SECRET_EXPIRES_IN }
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "Strict",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
  });

  res.status(200).json({
    status: "success",
    message: "Password reset successful",
  });
}


module.exports = {updatePassword, forgotPassword, resetPassword}
