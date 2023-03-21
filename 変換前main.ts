function toYearJp(year: number): string {
  const eraYear = {
    meiji: 1868,
    taisho: 1912,
    showa: 1926,
    heisei: 1989,
    reiwa: 2019
  };
  if (year < eraYear.taisho) {
    return "明治" + (year - eraYear.meiji + 1);
  } else if (year < eraYear.showa) {
    return "大正" + (year - eraYear.taisho + 1);
  } else if (year < eraYear.heisei) {
    return "昭和" + (year - eraYear.showa + 1);
  } else if (year < eraYear.reiwa) {
    return "平成" + (year - eraYear.heisei + 1);
  } else {
    return "令和" + (year - eraYear.reiwa + 1);
  }
}

function calculateSchoolHistory(year: number, month: number): string {
  const schoolYears = [
    { name: '小学校', duration: 6 },
    { name: '中学校', duration: 3 },
    { name: '高等学校', duration: 3 },
    { name: '大学／専門学校', duration: 4 },
  ];

  let result = '';
  let entranceYearOffset = month >= 4 ? 1 : 0;

  schoolYears.reduce((entranceYear, school) => {
    const graduationYear = entranceYear + school.duration;

    result += `<h3>${school.name}入学</h3>`;
    result += `<p>${entranceYear}年 ${toYearJp(entranceYear)}年 4月</p>`;
    result += `<h3>${school.name}卒業</h3>`;
    result += `<p>${graduationYear}年 ${toYearJp(graduationYear)}年 3月</p>`;
    result += `<p>${school.duration}年間修業</p>`;

    return graduationYear;
  }, year + entranceYearOffset + 6);

  return result;
}

const form = document.getElementById("form") as HTMLFormElement;
const output = document.getElementById("output") as HTMLDivElement;

form.addEventListener("submit", (event: Event) => {
  event.preventDefault();

  const year = parseInt((form.elements.namedItem("year") as HTMLInputElement).value);
  const month = parseInt((form.elements.namedItem("month") as HTMLInputElement).value);
  const day = parseInt((form.elements.namedItem("day") as HTMLInputElement).value);

  // 学歴の入学・卒業年度を計算する
  const result = calculateSchoolHistory(year, month);

  // 結果を表示する
  output.innerHTML = "<h2>あなたの学歴</h2>" + result;
});

const darkModeToggle = document.getElementById("dark-mode-toggle") as HTMLButtonElement;

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});