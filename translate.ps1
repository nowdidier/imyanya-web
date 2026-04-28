# translate.ps1
# Run from: C:\Users\Novar\OneDrive\Documents\imyanya-web\

$files = Get-ChildItem -Path src -Recurse -Include "*.js","*.jsx","*.ts","*.tsx" |
  Select-String -Pattern "[àáâãèéêìíòóôõùúýăđơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]" |
  Select-Object -ExpandProperty Path -Unique

$translations = @{
  # ── Auth & Navigation ──────────────────────────────────────────────
  "Đăng nhập"                    = "Login"
  "Đăng ký"                      = "Register"
  "Đăng xuất"                    = "Logout"
  "Quên mật khẩu"                = "Forgot Password"
  "Cập nhật mật khẩu"            = "Reset Password"
  "Xác nhận mật khẩu"            = "Confirm Password"
  "Mật khẩu"                     = "Password"
  "Mật khẩu mới"                 = "New Password"
  "Mật khẩu cũ"                  = "Current Password"
  "Email"                        = "Email"
  "Tên đăng nhập"                = "Username"
  "Tài khoản"                    = "Account"
  "Xác minh email"               = "Email Verification"

  # ── Common Actions ─────────────────────────────────────────────────
  "Lưu"                          = "Save"
  "Hủy"                          = "Cancel"
  "Xác nhận"                     = "Confirm"
  "Đóng"                         = "Close"
  "Tiếp theo"                    = "Next"
  "Quay lại"                     = "Back"
  "Xóa"                          = "Delete"
  "Chỉnh sửa"                    = "Edit"
  "Cập nhật"                     = "Update"
  "Tìm kiếm"                     = "Search"
  "Lọc"                          = "Filter"
  "Thêm"                         = "Add"
  "Tải lên"                      = "Upload"
  "Tải xuống"                    = "Download"
  "Chia sẻ"                      = "Share"
  "Xem thêm"                     = "View More"
  "Xem tất cả"                   = "View All"
  "Áp dụng"                      = "Apply"
  "Đặt lại"                      = "Reset"
  "Gửi"                          = "Send"
  "Nộp"                          = "Submit"
  "Hoàn tất"                     = "Complete"
  "Bỏ qua"                       = "Skip"
  "Thử lại"                      = "Retry"

  # ── Jobs ───────────────────────────────────────────────────────────
  "Việc làm"                     = "Jobs"
  "Tìm kiếm việc làm"            = "Find Jobs"
  "Việc làm của tôi"             = "My Jobs"
  "Việc làm đã lưu"              = "Saved Jobs"
  "Việc làm đã ứng tuyển"        = "Applied Jobs"
  "Việc làm liên quan"           = "Related Jobs"
  "Việc làm nổi bật"             = "Featured Jobs"
  "Việc làm mới nhất"            = "Latest Jobs"
  "Tin tuyển dụng"               = "Job Posts"
  "Vị trí tuyển dụng"            = "Job Position"
  "Mô tả công việc"              = "Job Description"
  "Yêu cầu công việc"            = "Job Requirements"
  "Quyền lợi"                    = "Benefits"
  "Địa điểm làm việc"            = "Work Location"
  "Hình thức làm việc"           = "Job Type"
  "Ngành nghề"                   = "Career"
  "Hạn nộp hồ sơ"               = "Application Deadline"
  "Hạn nộp"                      = "Deadline"
  "Nộp hồ sơ"                    = "Apply Now"
  "Ứng tuyển"                    = "Apply"
  "Lưu việc làm"                 = "Save Job"
  "Việc làm gấp"                 = "Urgent Jobs"
  "Toàn thời gian"               = "Full-time"
  "Bán thời gian"                = "Part-time"
  "Từ xa"                        = "Remote"
  "Thực tập"                     = "Internship"
  "Hợp đồng"                     = "Contract"
  "Thỏa thuận"                   = "Negotiable"
  "Thoả thuận"                   = "Negotiable"

  # ── Salary & Experience ────────────────────────────────────────────
  "Mức lương"                    = "Salary"
  "Kinh nghiệm"                  = "Experience"
  "Chưa có kinh nghiệm"          = "No Experience Required"
  "Năm kinh nghiệm"              = "Years of Experience"
  "Cấp bậc"                      = "Level"
  "Vị trí"                       = "Position"
  "Trình độ học vấn"             = "Education Level"
  "Số lượng tuyển"               = "Vacancies"

  # ── Company ────────────────────────────────────────────────────────
  "Công ty"                      = "Company"
  "Công ty của tôi"              = "My Company"
  "Thông tin công ty"            = "Company Information"
  "Giới thiệu công ty"           = "About Company"
  "Quy mô công ty"               = "Company Size"
  "Loại hình công ty"            = "Company Type"
  "Website công ty"              = "Company Website"
  "Địa chỉ công ty"              = "Company Address"
  "Theo dõi công ty"             = "Follow Company"
  "Đã theo dõi"                  = "Following"

  # ── Profile ────────────────────────────────────────────────────────
  "Hồ sơ"                        = "Profile"
  "Hồ sơ của tôi"                = "My Profile"
  "Hồ sơ đính kèm"               = "Attached Profile"
  "Hồ sơ trực tuyến"             = "Online Profile"
  "Hồ sơ ứng tuyển"              = "Applied Profiles"
  "Hồ sơ đã lưu"                 = "Saved Profiles"
  "Cập nhật hồ sơ"               = "Update Profile"
  "Thông tin cá nhân"            = "Personal Information"
  "Thông tin chung"              = "General Information"
  "Kỹ năng"                      = "Skills"
  "Kỹ năng ngoại ngữ"            = "Language Skills"
  "Kỹ năng nâng cao"             = "Advanced Skills"
  "Học vấn"                      = "Education"
  "Kinh nghiệm làm việc"         = "Work Experience"
  "Chứng chỉ"                    = "Certificates"
  "Giới thiệu bản thân"          = "About Me"
  "Mục tiêu nghề nghiệp"         = "Career Objective"
  "Ảnh đại diện"                 = "Avatar"
  "Ảnh bìa"                      = "Cover Image"
  "Họ và tên"                    = "Full Name"
  "Họ"                           = "Last Name"
  "Tên"                          = "First Name"
  "Ngày sinh"                    = "Date of Birth"
  "Giới tính"                    = "Gender"
  "Nam"                          = "Male"
  "Nữ"                           = "Female"
  "Khác"                         = "Other"
  "Số điện thoại"                = "Phone Number"
  "Địa chỉ"                      = "Address"
  "Thành phố"                    = "City"
  "Tỉnh/Thành phố"               = "Province/City"
  "Quận/Huyện"                   = "District"

  # ── Dashboard ──────────────────────────────────────────────────────
  "Bảng điều khiển"              = "Dashboard"
  "Tổng quan"                    = "Overview"
  "Thống kê"                     = "Statistics"
  "Báo cáo"                      = "Reports"
  "Hoạt động gần đây"            = "Recent Activity"

  # ── Notifications ──────────────────────────────────────────────────
  "Thông báo"                    = "Notifications"
  "Thông báo việc làm"           = "Job Notifications"
  "Chưa đọc"                     = "Unread"
  "Đánh dấu đã đọc"              = "Mark as Read"

  # ── Settings ───────────────────────────────────────────────────────
  "Cài đặt"                      = "Settings"
  "Cài đặt tài khoản"            = "Account Settings"
  "Bảo mật"                      = "Security"
  "Ngôn ngữ"                     = "Language"
  "Giao diện"                    = "Theme"

  # ── Chat ───────────────────────────────────────────────────────────
  "Nhắn tin"                     = "Messages"
  "Trò chuyện"                   = "Chat"
  "Gửi tin nhắn"                 = "Send Message"
  "Nhập tin nhắn"                = "Type a message"
  "Kết nối với nhà tuyển dụng"   = "Chat with Employers"
  "Kết nối với ứng viên"         = "Chat with Candidates"

  # ── Status Messages ────────────────────────────────────────────────
  "Thành công"                   = "Success"
  "Lỗi"                          = "Error"
  "Cảnh báo"                     = "Warning"
  "Đang tải"                     = "Loading"
  "Không có dữ liệu"             = "No data found"
  "Không tìm thấy"               = "Not found"
  "Vui lòng thử lại"             = "Please try again"
  "Đã xảy ra lỗi"                = "An error occurred"
  "Lưu thành công"               = "Saved successfully"
  "Cập nhật thành công"          = "Updated successfully"
  "Xóa thành công"               = "Deleted successfully"
  "Gửi thành công"               = "Sent successfully"
  "Tải lên thành công"           = "Uploaded successfully"
  "Yêu cầu đã được gửi"         = "Request sent"

  # ── Validation Messages ────────────────────────────────────────────
  "Trường này là bắt buộc"       = "This field is required"
  "Email không hợp lệ"           = "Invalid email address"
  "Mật khẩu không khớp"         = "Passwords do not match"
  "Mật khẩu phải có ít nhất"    = "Password must be at least"
  "Số điện thoại không hợp lệ"  = "Invalid phone number"
  "URL không hợp lệ"             = "Invalid URL"
  "Vui lòng nhập"                = "Please enter"
  "Vui lòng chọn"                = "Please select"
  "Tối đa"                       = "Maximum"
  "Tối thiểu"                    = "Minimum"
  "ký tự"                        = "characters"

  # ── Employer Specific ──────────────────────────────────────────────
  "Nhà tuyển dụng"               = "Employer"
  "Danh sách ứng viên"           = "Candidate List"
  "Chi tiết ứng viên"            = "Candidate Detail"
  "Ứng viên"                     = "Candidate"
  "Hồ sơ ứng viên"               = "Candidate Profile"
  "Phê duyệt"                    = "Approve"
  "Từ chối"                      = "Reject"
  "Đang xét duyệt"               = "Under Review"
  "Đã duyệt"                     = "Approved"
  "Đã từ chối"                   = "Rejected"
  "Trạng thái"                   = "Status"
  "Đang hoạt động"               = "Active"
  "Hết hạn"                      = "Expired"
  "Tạm dừng"                     = "Paused"
  "Nháp"                         = "Draft"

  # ── Job Seeker Specific ────────────────────────────────────────────
  "Người tìm việc"               = "Job Seeker"
  "Tìm việc"                     = "Find Work"
  "CV của tôi"                   = "My CV"
  "Tạo CV"                       = "Create CV"
  "Tải CV"                       = "Upload CV"
  "Xem CV"                       = "View CV"
  "In CV"                        = "Print CV"

  # ── Location ───────────────────────────────────────────────────────
  "Địa điểm"                     = "Location"
  "Toàn quốc"                    = "Nationwide"
  "Hà Nội"                       = "Hanoi"
  "Hồ Chí Minh"                  = "Ho Chi Minh City"
  "Đà Nẵng"                      = "Da Nang"
  "Cần Thơ"                      = "Can Tho"
  "Hải Phòng"                    = "Hai Phong"
}

# Sort by length descending so longer phrases are replaced first
$sortedKeys = $translations.Keys | Sort-Object { $_.Length } -Descending

$count = 0
foreach ($file in $files) {
  $content = Get-Content $file -Raw -Encoding UTF8
  $modified = $false

  foreach ($viet in $sortedKeys) {
    if ($content -match [regex]::Escape($viet)) {
      $content = $content -creplace [regex]::Escape($viet), $translations[$viet]
      $modified = $true
    }
  }

  if ($modified) {
    [System.IO.File]::WriteAllText($file, $content, [System.Text.UTF8Encoding]::new($true))
    Write-Host "Updated: $file" -ForegroundColor Green
    $count++
  }
}

Write-Host "`nDone. $count file(s) updated." -ForegroundColor Cyan
