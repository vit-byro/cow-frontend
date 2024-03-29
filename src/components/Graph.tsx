import "./Graph.css";
import logo from "../images/cow_logo_01.png";
import dot from "../images/cow512.png";

type graphProps = {
  currency: string;
  dateRates: { date: string; rate: number }[];
  timeSelect: string;
};
export default function Graph({ currency, dateRates, timeSelect }: graphProps) {
  let max: number = 0;
  let min: number = 100000;
  dateRates.forEach((day) => {
    if (day.rate > max) {
      max = day.rate;
    }
    if (day.rate < min) {
      min = day.rate;
    }
  });
  return (
    <div className="graph-container">
      <h2>{currency}</h2>
      <div className="graph">
        {dateRates.map((dayRate) => (
          <div className="column" key={currency + dayRate.date}>
            <div
              className="column-label"
              style={{
                height:
                  (
                    100 -
                    (((dayRate.rate - min) / (max - min * 0.995)) * 100 + 10)
                  ).toString() + "%",
              }}
            >
              <span>{dayRate.rate}</span>
              <img
                className={
                  timeSelect === "week" || timeSelect === "month"
                    ? "HQdot"
                    : "dot"
                }
                src={
                  timeSelect === "week" || timeSelect === "month" ? logo : dot
                }
                alt="*"
                key={currency + dayRate.date + "logo"}
              />
            </div>

            <div
              className="column-value"
              key={currency + dayRate.date + "value"}
              style={{
                height:
                  (
                    ((dayRate.rate - min) / (max - min * 0.995)) * 100 +
                    10
                  ).toString() + "%",
              }}
            >
              <span className="date">{dayRate.date.slice(0, 10)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
