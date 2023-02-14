import React, { useState } from "react";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";

function Filter({ status, setStatus }) {
  const [dd, setDd] = useState({
    type: false,
    rice: false,
    format: false,
    years: false,
  });

  return (
    <div className={status ? "filter-wrapper" : "filter-wrapper filter-closed"}>
      <div className="overlay" onClick={() => setStatus(false)}>
        <div className="handle"></div>
      </div>
      <div className="main-wrapper">
        <div className="filter-box type">
          <div className={dd.type ? "top-wrapper no-margin" : "top-wrapper"}>
            <h4>PRODUCT TYPE</h4>
            {dd.type ? (
              <RiArrowDownSLine
                onClick={() => setDd({ ...dd, type: !dd.type })}
              />
            ) : (
              <RiArrowUpSLine
                onClick={() => setDd({ ...dd, type: !dd.type })}
              />
            )}
          </div>
          <div className={dd.type ? "bot-wrapper hidden" : "bot-wrapper"}>
            <div className="wrapper">
              <input type="checkbox" name="" id=" " />
              <p>
                Painting <span>(411)</span>
              </p>
            </div>
            <div className="wrapper">
              <input type="checkbox" name="" id=" " />
              <p>
                Painting <span>(411)</span>
              </p>
            </div>
            <div className="wrapper">
              <input type="checkbox" name="" id=" " />
              <p>
                Painting <span>(411)</span>
              </p>
            </div>
            <div className="wrapper">
              <input type="checkbox" name="" id=" " />
              <p>
                Painting <span>(411)</span>
              </p>
            </div>
          </div>
        </div>
        <div className="filter-box price">
          <div className={dd.price ? "top-wrapper no-margin" : "top-wrapper"}>
            <h4>PRICE</h4>
            {dd.price ? (
              <RiArrowDownSLine
                onClick={() => setDd({ ...dd, price: !dd.price })}
              />
            ) : (
              <RiArrowUpSLine
                onClick={() => setDd({ ...dd, price: !dd.price })}
              />
            )}
          </div>
          <div
            className={dd.price ? "bot-wrapper no-margin" : "bot-wrapper"}
          ></div>
        </div>

        <div className="filter-box years">
          <div className={dd.years ? "top-wrapper no-margin" : "top-wrapper"}>
            <h4>YEARS</h4>
            {dd.years ? (
              <RiArrowDownSLine
                onClick={() => setDd({ ...dd, years: !dd.years })}
              />
            ) : (
              <RiArrowUpSLine
                onClick={() => setDd({ ...dd, years: !dd.years })}
              />
            )}
          </div>
          <div className={dd.years ? "bot-wrapper hidden" : "bot-wrapper"}>
            <div className="wrapper">
              <input type="checkbox" name="" id=" " />
              <p>
                Painting <span>(411)</span>
              </p>
            </div>
            <div className="wrapper">
              <input type="checkbox" name="" id=" " />
              <p>
                Painting <span>(411)</span>
              </p>
            </div>
            <div className="wrapper">
              <input type="checkbox" name="" id=" " />
              <p>
                Painting <span>(411)</span>
              </p>
            </div>
            <div className="wrapper">
              <input type="checkbox" name="" id=" " />
              <p>
                Painting <span>(411)</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
