// translate.js
// Run from project root: node translate.js

const fs = require("fs");
const path = require("path");

const translations = {
  // ── Auth & Navigation ──────────────────────────────────────────────
  "Đăng nhập": "Login",
  "Đăng ký": "Register",
  "Đăng xuất": "Logout",
  "Quên mật khẩu": "Forgot Password",
  "Cập nhật mật khẩu": "Reset Password",
  "Xác nhận mật khẩu": "Confirm Password",
  "Mật khẩu mới": "New Password",
  "Mật khẩu cũ": "Current Password",
  "Mật khẩu": "Password",
  "Tên đăng nhập": "Username",
  "Tài khoản": "Account",
  "Xác minh email": "Email Verification",

  // ── Common Actions ─────────────────────────────────────────────────
  "Lưu": "Save",
  "Hủy": "Cancel",
  "Xác nhận": "Confirm",
  "Đóng": "Close",
  "Tiếp theo": "Next",
  "Quay lại": "Back",
  "Xóa": "Delete",
  "Chỉnh sửa": "Edit",
  "Cập nhật": "Update",
  "Tìm kiếm": "Search",
  "Lọc": "Filter",
  "Thêm": "Add",
  "Tải lên": "Upload",
  "Tải xuống": "Download",
  "Chia sẻ": "Share",
  "Xem thêm": "View More",
  "Xem tất cả": "View All",
  "Áp dụng": "Apply",
  "Đặt lại": "Reset",
  "Gửi": "Send",
  "Nộp": "Submit",
  "Hoàn tất": "Complete",
  "Bỏ qua": "Skip",
  "Thử lại": "Retry",

  // ── Jobs ───────────────────────────────────────────────────────────
  "Tìm kiếm việc làm": "Find Jobs",
  "Việc làm của tôi": "My Jobs",
  "Việc làm đã lưu": "Saved Jobs",
  "Việc làm đã ứng tuyển": "Applied Jobs",
  "Việc làm liên quan": "Related Jobs",
  "Việc làm nổi bật": "Featured Jobs",
  "Việc làm mới nhất": "Latest Jobs",
  "Việc làm gấp": "Urgent Jobs",
  "Việc làm": "Jobs",
  "Tin tuyển dụng": "Job Posts",
  "Vị trí tuyển dụng": "Job Position",
  "Mô tả công việc": "Job Description",
  "Yêu cầu công việc": "Job Requirements",
  "Quyền lợi": "Benefits",
  "Địa điểm làm việc": "Work Location",
  "Hình thức làm việc": "Job Type",
  "Ngành nghề": "Career",
  "Hạn nộp hồ sơ": "Application Deadline",
  "Hạn nộp": "Deadline",
  "Nộp hồ sơ": "Apply Now",
  "Ứng tuyển": "Apply",
  "Lưu việc làm": "Save Job",
  "Toàn thời gian": "Full-time",
  "Bán thời gian": "Part-time",
  "Từ xa": "Remote",
  "Thực tập": "Internship",
  "Hợp đồng": "Contract",
  "Thỏa thuận": "Negotiable",
  "Thoả thuận": "Negotiable",

  // ── Salary & Experience ────────────────────────────────────────────
  "Mức lương": "Salary",
  "Chưa có kinh nghiệm": "No Experience Required",
  "Năm kinh nghiệm": "Years of Experience",
  "Kinh nghiệm làm việc": "Work Experience",
  "Kinh nghiệm": "Experience",
  "Cấp bậc": "Level",
  "Vị trí": "Position",
  "Trình độ học vấn": "Education Level",
  "Số lượng tuyển": "Vacancies",

  // ── Company ────────────────────────────────────────────────────────
  "Công ty của tôi": "My Company",
  "Thông tin công ty": "Company Info",
  "Giới thiệu công ty": "About Company",
  "Quy mô công ty": "Company Size",
  "Loại hình công ty": "Company Type",
  "Website công ty": "Company Website",
  "Địa chỉ công ty": "Company Address",
  "Theo dõi công ty": "Follow Company",
  "Công ty": "Company",
  "Đã theo dõi": "Following",

  // ── Profile ────────────────────────────────────────────────────────
  "Hồ sơ của tôi": "My Profile",
  "Hồ sơ đính kèm": "Attached Profile",
  "Hồ sơ trực tuyến": "Online Profile",
  "Hồ sơ ứng tuyển": "Applied Profiles",
  "Hồ sơ đã lưu": "Saved Profiles",
  "Cập nhật hồ sơ": "Update Profile",
  "Hồ sơ ứng viên": "Candidate Profile",
  "Hồ sơ": "Profile",
  "Thông tin cá nhân": "Personal Information",
  "Thông tin chung": "General Information",
  "Kỹ năng ngoại ngữ": "Language Skills",
  "Kỹ năng nâng cao": "Advanced Skills",
  "Kỹ năng": "Skills",
  "Học vấn": "Education",
  "Chứng chỉ": "Certificates",
  "Giới thiệu bản thân": "About Me",
  "Mục tiêu nghề nghiệp": "Career Objective",
  "Ảnh đại diện": "Avatar",
  "Ảnh bìa": "Cover Image",
  "Họ và tên": "Full Name",
  "Ngày sinh": "Date of Birth",
  "Giới tính": "Gender",
  "Số điện thoại": "Phone Number",
  "Tỉnh/Thành phố": "Province/City",
  "Thành phố": "City",
  "Quận/Huyện": "District",
  "Địa chỉ": "Address",
  "Họ": "Last Name",
  "Tên": "First Name",
  "Nam": "Male",
  "Nữ": "Female",
  "Khác": "Other",

  // ── Dashboard ──────────────────────────────────────────────────────
  "Bảng điều khiển": "Dashboard",
  "Tổng quan": "Overview",
  "Thống kê": "Statistics",
  "Báo cáo": "Reports",
  "Hoạt động gần đây": "Recent Activity",

  // ── Notifications ──────────────────────────────────────────────────
  "Thông báo việc làm": "Job Notifications",
  "Thông báo": "Notifications",
  "Chưa đọc": "Unread",
  "Đánh dấu đã đọc": "Mark as Read",

  // ── Settings ───────────────────────────────────────────────────────
  "Cài đặt tài khoản": "Account Settings",
  "Cài đặt": "Settings",
  "Bảo mật": "Security",
  "Ngôn ngữ": "Language",
  "Giao diện": "Theme",

  // ── Chat ───────────────────────────────────────────────────────────
  "Nhắn tin": "Messages",
  "Trò chuyện": "Chat",
  "Gửi tin nhắn": "Send Message",
  "Nhập tin nhắn": "Type a message",
  "Kết nối với nhà tuyển dụng": "Chat with Employers",
  "Kết nối với ứng viên": "Chat with Candidates",

  // ── Status Messages ────────────────────────────────────────────────
  "Thành công": "Success",
  "Cảnh báo": "Warning",
  "Đang tải": "Loading",
  "Không có dữ liệu": "No data found",
  "Không tìm thấy": "Not found",
  "Vui lòng thử lại": "Please try again",
  "Đã xảy ra lỗi": "An error occurred",
  "Lưu thành công": "Saved successfully",
  "Cập nhật thành công": "Updated successfully",
  "Xóa thành công": "Deleted successfully",
  "Gửi thành công": "Sent successfully",
  "Tải lên thành công": "Uploaded successfully",
  "Yêu cầu đã được gửi": "Request sent",
  "Lỗi": "Error",

  // ── Validation Messages ────────────────────────────────────────────
  "Trường này là bắt buộc": "This field is required",
  "Email không hợp lệ": "Invalid email address",
  "Mật khẩu không khớp": "Passwords do not match",
  "Mật khẩu phải có ít nhất": "Password must be at least",
  "Số điện thoại không hợp lệ": "Invalid phone number",
  "URL không hợp lệ": "Invalid URL",
  "Vui lòng nhập": "Please enter",
  "Vui lòng chọn": "Please select",
  "Tối đa": "Maximum",
  "Tối thiểu": "Minimum",
  "ký tự": "characters",

  // ── Employer Specific ──────────────────────────────────────────────
  "Nhà tuyển dụng": "Employer",
  "Danh sách ứng viên": "Candidate List",
  "Chi tiết ứng viên": "Candidate Detail",
  "Ứng viên": "Candidate",
  "Phê duyệt": "Approve",
  "Từ chối": "Reject",
  "Đang xét duyệt": "Under Review",
  "Đã duyệt": "Approved",
  "Đã từ chối": "Rejected",
  "Trạng thái": "Status",
  "Đang hoạt động": "Active",
  "Hết hạn": "Expired",
  "Tạm dừng": "Paused",
  "Nháp": "Draft",

  // ── Job Seeker Specific ────────────────────────────────────────────
  "Người tìm việc": "Job Seeker",
  "Tìm việc": "Find Work",
  "CV của tôi": "My CV",
  "Tạo CV": "Create CV",
  "Tải CV": "Upload CV",
  "Xem CV": "View CV",
  "In CV": "Print CV",

  // ── Location ───────────────────────────────────────────────────────
  "Địa điểm": "Location",
  "Toàn quốc": "Nationwide",
  "Hà Nội": "Hanoi",
  "Hồ Chí Minh": "Ho Chi Minh City",
  "Đà Nẵng": "Da Nang",
  "Cần Thơ": "Can Tho",
  "Hải Phòng": "Hai Phong",
};

// Sort keys longest-first so longer phrases replace before shorter substrings
const sortedKeys = Object.keys(translations).sort((a, b) => b.length - a.length);

function getAllFiles(dir, exts, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== "node_modules" && entry.name !== ".git") {
      getAllFiles(full, exts, results);
    } else if (entry.isFile() && exts.includes(path.extname(entry.name))) {
      results.push(full);
    }
  }
  return results;
}

const viRegex = /[àáâãèéêìíòóôõùúýăđơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹđÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝĂĐƠƯ]/;

const files = getAllFiles("src", [".js", ".jsx", ".ts", ".tsx"]).filter((f) => {
  const content = fs.readFileSync(f, "utf8");
  return viRegex.test(content);
});

console.log(`\nFound ${files.length} files with Vietnamese text.\n`);

let updatedCount = 0;

for (const file of files) {
  let content = fs.readFileSync(file, "utf8");
  let modified = false;

  for (const viet of sortedKeys) {
    if (content.includes(viet)) {
      content = content.split(viet).join(translations[viet]);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(file, content, "utf8");
    console.log(`✓ Updated: ${file}`);
    updatedCount++;
  }
}

console.log(`\nDone. ${updatedCount} file(s) updated.\n`);
