const { expect } = require("chai");
const { japaneseYear, gregorianYearRange } = require("./index");

describe("#japaneseYear", () => {
  it("should convert the Gregorian date to the appropriate Japanese calendar year", () => {
    const heiseiExactYear = japaneseYear(new Date(1989, 0, 9));
    const showaYear2 = japaneseYear(new Date(1989, 0, 6));
    const showaYear = japaneseYear(new Date(1987, 6, 6));
    const meijiExactYear = japaneseYear(new Date(1869, 6, 6));

    expect(heiseiExactYear.names).to.include("Heisei");
    expect(showaYear2.names).to.include("Showa");
    expect(heiseiExactYear.currentJapaneseYear).to.equal(1);
    expect(showaYear.names).to.include("Showa");
    expect(showaYear.currentJapaneseYear).to.equal(62);
    expect(meijiExactYear.names).to.include("Meiji");
    expect(meijiExactYear.currentJapaneseYear).to.equal(2);
  });

  it("should convert any date above the last emperor calendar date", () => {
    const heiseiYear = japaneseYear(new Date(1990, 1, 1));
    const tokyoOlympicYear = japaneseYear(new Date(2020, 6, 7));

    expect(heiseiYear.names).to.include("Heisei");
    expect(heiseiYear.currentJapaneseYear).to.equal(2);
    expect(tokyoOlympicYear.names).to.include("Heisei");
    expect(tokyoOlympicYear.currentJapaneseYear).to.equal(32);
  });

 it("should convert any date below the first recorded emperor calendar date to null", () => {
    const gennaYear = japaneseYear(new Date(1615, 6, 1));
    const firstAdYear = japaneseYear(new Date(1600, 1, 1));

    expect(gennaYear.names).to.include("Genna");
    expect(firstAdYear).to.equal(null);
  });

  it("should convert the Gregorian date in date format to the appropriate Japanese calendar year", () => {
    const heiseiExactYear = japaneseYear(new Date(1989, 2));
    const showaYear = japaneseYear(new Date(1987, 0));
    const meijiExactYear = japaneseYear(new Date(1868, 11));

    expect(heiseiExactYear.names).to.include("Heisei");
    expect(heiseiExactYear.currentJapaneseYear).to.equal(1);
    expect(showaYear.names).to.include("Showa");
    expect(showaYear.currentJapaneseYear).to.equal(62);
    expect(meijiExactYear.names).to.include("Meiji");
    expect(meijiExactYear.currentJapaneseYear).to.equal(1);
  });

  it("should throw a type error for a type it doesn't expect", () => {
    expect(() => japaneseYear([])).to.throw(TypeError);
  });
});

describe("#gregorianYearRange", () => {
  it("should convert the Japanese calendar year to the Gregorian year", () => {
    const heiseiPeriodRange = gregorianYearRange("平成");
    const heiseiPeriodRangeEnglish = gregorianYearRange("Heisei");
    const showaPeriodRange = gregorianYearRange("昭和");
    const meijiPeriodRange = gregorianYearRange("明治");
    const genjiPeriodRange = gregorianYearRange("元治");
    const doesntExistPeriodRange = gregorianYearRange("横浜");

    expect(heiseiPeriodRange.startYear).to.equal(1989);
    expect(heiseiPeriodRangeEnglish.startYear).to.equal(1989);
    expect(showaPeriodRange.startYear).to.equal(1926);
    expect(meijiPeriodRange.startYear).to.equal(1868);
    expect(genjiPeriodRange.startYear).to.equal(1864);
    expect(heiseiPeriodRange.endYear).to.equal(null);
    expect(heiseiPeriodRangeEnglish.endYear).to.equal(null);
    expect(showaPeriodRange.endYear).to.equal(1988);
    expect(meijiPeriodRange.endYear).to.equal(1911);
    expect(genjiPeriodRange.endYear).to.equal(1864);
    expect(doesntExistPeriodRange).to.equal(null);
  });

  it("should throw a type error for a non string it doesn't expect", () => {
    expect(() => gregorianYearRange(1229)).to.throw(TypeError);
  });
});
