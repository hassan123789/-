function toYearJp(year) {
    var eraYear = {
        meiji: 1868,
        taisho: 1912,
        showa: 1926,
        heisei: 1989,
        reiwa: 2019
    };
    if (year < eraYear.taisho) {
        return "明治" + (year - eraYear.meiji + 1);
    }
    else if (year < eraYear.showa) {
        return "大正" + (year - eraYear.taisho + 1);
    }
    else if (year < eraYear.heisei) {
        return "昭和" + (year - eraYear.showa + 1);
    }
    else if (year < eraYear.reiwa) {
        return "平成" + (year - eraYear.heisei + 1);
    }
    else {
        return "令和" + (year - eraYear.reiwa + 1);
    }
}
function calculateSchoolHistory(year, month) {
    var schoolYears = [
        { name: '小学校', duration: 6 },
        { name: '中学校', duration: 3 },
        { name: '高等学校', duration: 3 },
        { name: '大学／専門学校', duration: 4 },
    ];
    var result = '';
    var entranceYearOffset = month >= 4 ? 1 : 0;
    schoolYears.reduce(function (entranceYear, school) {
        var graduationYear = entranceYear + school.duration;
        result += "<h3>".concat(school.name, "\u5165\u5B66</h3>");
        result += "<p>".concat(entranceYear, "\u5E74 ").concat(toYearJp(entranceYear), "\u5E74 4\u6708</p>");
        result += "<h3>".concat(school.name, "\u5352\u696D</h3>");
        result += "<p>".concat(graduationYear, "\u5E74 ").concat(toYearJp(graduationYear), "\u5E74 3\u6708</p>");
        result += "<p>".concat(school.duration, "\u5E74\u9593\u4FEE\u696D</p>");
        return graduationYear;
    }, year + entranceYearOffset + 6);
    return result;
}
var form = document.getElementById("form");
var output = document.getElementById("output");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    var year = parseInt(form.elements.namedItem("year").value);
    var month = parseInt(form.elements.namedItem("month").value);
    var day = parseInt(form.elements.namedItem("day").value);
    // 学歴の入学・卒業年度を計算する
    var result = calculateSchoolHistory(year, month);
    // 結果を表示する
    output.innerHTML = "<h2>あなたの学歴</h2>" + result;
});
var darkModeToggle = document.getElementById("dark-mode-toggle");
darkModeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark");
});
