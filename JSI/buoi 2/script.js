const students = [
    {
        name: "An",
        scores: {
            Toan: { scores: 7.4, evaluation: "Đ" },
            NguVan: { scores: 8.9, evaluation: "Đ" },
            NgoaiNgu: { scores: 8.5, evaluation: "Đ" },
            VatLy: { scores: 9.0, evaluation: "Đ" },
            HoaHoc: { scores: 3.9, evaluation: "KĐ" },
            SinhHoc: { scores: 5.0, evaluation: "Đ" },
            LichSu: { scores: 8.3, evaluation: "Đ" },
            DiaLy: { scores: 9.4, evaluation: "Đ" },
            GDCD: { scores: 6.6, evaluation: "Đ" },
        },
    },
    {
        name: "Binh",
        scores: {
            Toan: { scores: 3.4, evaluation: "KĐ" },
            NguVan: { scores: 5.9, evaluation: "Đ" },
            NgoaiNgu: { scores: 5.4, evaluation: "Đ" },
            VatLy: { scores: 7.4, evaluation: "Đ" },
            HoaHoc: { scores: 9.3, evaluation: "Đ" },
            SinhHoc: { scores: 8.6, evaluation: "Đ" },
            LichSu: { scores: 5.2, evaluation: "Đ" },
            DiaLy: { scores: 7.1, evaluation: "Đ" },
            GDCD: { scores: 6.7, evaluation: "Đ" },
        },
    },
    {
        name: "Chi",
        scores: {
            Toan: { scores: 9.8, evaluation: "Đ" },
            NguVan: { scores: 9.2, evaluation: "Đ" },
            NgoaiNgu: { scores: 9.5, evaluation: "Đ" },
            VatLy: { scores: 9.0, evaluation: "Đ" },
            HoaHoc: { scores: 9.2, evaluation: "Đ" },
            SinhHoc: { scores: 8.8, evaluation: "Đ" },
            LichSu: { scores: 8.5, evaluation: "Đ" },
            DiaLy: { scores: 8.9, evaluation: "Đ" },
            GDCD: { scores: 9.4, evaluation: "Đ" },
        },
    },
    {
        name: "Dung",
        scores: {
            Toan: { scores: 5.2, evaluation: "Đ" },
            NguVan: { scores: 4.5, evaluation: "KĐ" },
            NgoaiNgu: { scores: 5.0, evaluation: "Đ" },
            VatLy: { scores: 5.5, evaluation: "Đ" },
            HoaHoc: { scores: 4.8, evaluation: "KĐ" },
            SinhHoc: { scores: 6.0, evaluation: "Đ" },
            LichSu: { scores: 7.2, evaluation: "Đ" },
            DiaLy: { scores: 6.5, evaluation: "Đ" },
            GDCD: { scores: 7.0, evaluation: "Đ" },
        },
    },
    {
        name: "Em",
        scores: {
            Toan: { scores: 8.5, evaluation: "Đ" },
            NguVan: { scores: 8.0, evaluation: "Đ" },
            NgoaiNgu: { scores: 9.2, evaluation: "Đ" },
            VatLy: { scores: 7.8, evaluation: "Đ" },
            HoaHoc: { scores: 7.5, evaluation: "Đ" },
            SinhHoc: { scores: 8.2, evaluation: "Đ" },
            LichSu: { scores: 7.0, evaluation: "Đ" },
            DiaLy: { scores: 7.4, evaluation: "Đ" },
            GDCD: { scores: 8.8, evaluation: "Đ" },
        },
    },
    {
        name: "Giang",
        scores: {
            Toan: { scores: 4.2, evaluation: "KĐ" },
            NguVan: { scores: 5.5, evaluation: "Đ" },
            NgoaiNgu: { scores: 4.8, evaluation: "KĐ" },
            VatLy: { scores: 5.0, evaluation: "Đ" },
            HoaHoc: { scores: 5.2, evaluation: "Đ" },
            SinhHoc: { scores: 4.9, evaluation: "KĐ" },
            LichSu: { scores: 5.8, evaluation: "Đ" },
            DiaLy: { scores: 6.0, evaluation: "Đ" },
            GDCD: { scores: 6.5, evaluation: "Đ" },
        },
    },
    {
        name: "Hung",
        scores: {
            Toan: { scores: 9.0, evaluation: "Đ" },
            NguVan: { scores: 6.5, evaluation: "Đ" },
            NgoaiNgu: { scores: 7.0, evaluation: "Đ" },
            VatLy: { scores: 9.5, evaluation: "Đ" },
            HoaHoc: { scores: 9.8, evaluation: "Đ" },
            SinhHoc: { scores: 9.2, evaluation: "Đ" },
            LichSu: { scores: 5.5, evaluation: "Đ" },
            DiaLy: { scores: 6.2, evaluation: "Đ" },
            GDCD: { scores: 7.5, evaluation: "Đ" },
        },
    },
    {
        name: "Khanh",
        scores: {
            Toan: { scores: 7.0, evaluation: "Đ" },
            NguVan: { scores: 7.2, evaluation: "Đ" },
            NgoaiNgu: { scores: 7.5, evaluation: "Đ" },
            VatLy: { scores: 7.0, evaluation: "Đ" },
            HoaHoc: { scores: 7.2, evaluation: "Đ" },
            SinhHoc: { scores: 7.5, evaluation: "Đ" },
            LichSu: { scores: 7.0, evaluation: "Đ" },
            DiaLy: { scores: 7.2, evaluation: "Đ" },
            GDCD: { scores: 7.8, evaluation: "Đ" },
        },
    },
    {
        name: "Lan",
        scores: {
            Toan: { scores: 8.8, evaluation: "Đ" },
            NguVan: { scores: 9.5, evaluation: "Đ" },
            NgoaiNgu: { scores: 9.0, evaluation: "Đ" },
            VatLy: { scores: 8.5, evaluation: "Đ" },
            HoaHoc: { scores: 8.0, evaluation: "Đ" },
            SinhHoc: { scores: 8.2, evaluation: "Đ" },
            LichSu: { scores: 9.8, evaluation: "Đ" },
            DiaLy: { scores: 9.5, evaluation: "Đ" },
            GDCD: { scores: 9.2, evaluation: "Đ" },
        },
    },
    {
        name: "Minh",
        scores: {
            Toan: { scores: 6.5, evaluation: "Đ" },
            NguVan: { scores: 8.2, evaluation: "Đ" },
            NgoaiNgu: { scores: 6.0, evaluation: "Đ" },
            VatLy: { scores: 5.8, evaluation: "Đ" },
            HoaHoc: { scores: 6.2, evaluation: "Đ" },
            SinhHoc: { scores: 6.5, evaluation: "Đ" },
            LichSu: { scores: 8.8, evaluation: "Đ" },
            DiaLy: { scores: 8.5, evaluation: "Đ" },
            GDCD: { scores: 9.0, evaluation: "Đ" },
        },
    }
];

function LocDanhSach3HSDatDiemTBHKCaoNhat(students) {
    const studentsWithAverageScore = students.map(student => {
        const scores = Object.values(student.scores).map(score => score.scores);
        const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        return { ...student, averageScore };
    });

    const maxAverageScore = Math.max(...studentsWithAverageScore.map(student => student.averageScore));

    const topStudents = studentsWithAverageScore.filter(student => student.averageScore === maxAverageScore);
    return topStudents;
}
function LocDanhSachHSDatDiemTBHKThapNhat(students) {
    const studentsWithAverageScore = students.map(student => {
        const scores = Object.values(student.scores).map(score => score.scores);
        const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        return { ...student, averageScore };
    });

    const minAverageScore = Math.min(...studentsWithAverageScore.map(student => student.averageScore));

    const bottomStudents = studentsWithAverageScore.filter(student => student.averageScore === minAverageScore);
    return bottomStudents;
}
function DiemTrungBinh10HSTrongLop(students) {
    const studentsWithAverageScore = students.map(student => {
        const scores = Object.values(student.scores).map(score => score.scores);
        const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        return { ...student, averageScore };
    });

    const averageScoreOfClass = studentsWithAverageScore.reduce((sum, student) => sum + student.averageScore, 0) / studentsWithAverageScore.length;
    return averageScoreOfClass;
}
function TenHSDatDanhHieuHocLuc(students) {
    const studentsWithAverageScore = students.map(student => {
        const scores = Object.values(student.scores).map(score => score.scores);
        const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        return { ...student, averageScore };
    });

    const studentsWithAcademicTitle = studentsWithAverageScore.map(student => {
        let evaluation = "";
        if (student.averageScore >= 9) {
            evaluation = "Xuất sắc";
        }
        else if (student.averageScore >= 8) {
            evaluation = "Giỏi";
        }
        else if (student.averageScore >= 6.5) {
            evaluation = "Khá";
        }
        else if (student.averageScore >= 5) {
            evaluation = "Trung bình";
        }
        else {
            evaluation = "Yếu";
        }
        return { ...student, evaluation: evaluation };
    });

    return studentsWithAcademicTitle.map(student => ({ name: student.name, evaluation: student.evaluation }));
}
function DanhsachCoDiemTBHKCaoHonHoacBang7(students) {
    const studentsWithAverageScore = students.map(student => {
        const scores = Object.values(student.scores).map(score => score.scores);
        const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        return { ...student, averageScore };
    });

    const studentsWithAverageScoreAboveOrEqual7 = studentsWithAverageScore.filter(student => student.averageScore >= 7);
    return studentsWithAverageScoreAboveOrEqual7.map(student => student.name);
}

console.log("Danh sách học sinh đạt điểm trung bình học kỳ cao nhất:", LocDanhSach3HSDatDiemTBHKCaoNhat(students));
console.log("Danh sách học sinh đạt điểm trung bình học kỳ thấp nhất:", LocDanhSachHSDatDiemTBHKThapNhat(students));
console.log("Điểm trung bình của 10 học sinh trong lớp:", DiemTrungBinh10HSTrongLop(students));
console.log("Tên học sinh đạt danh hiệu học lực:", TenHSDatDanhHieuHocLuc(students));
console.log("Danh sách học sinh có điểm trung bình học kỳ cao hơn hoặc bằng 7:", DanhsachCoDiemTBHKCaoHonHoacBang7(students));