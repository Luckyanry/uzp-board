import React from "react";
import "./HomePage.scss";

export const HomePage = () => (
  <>
    <h2 className={"content-block"}>Home</h2>
    <div className={"content-block"}>
      <div className={"dx-card responsive-paddings"}>
        <div className={"logos-container"}>
          <svg
            className={"react-logo"}
            viewBox={"0 0 184 62"}
            xmlns={"http://www.w3.org/2000/svg"}
          >
            <circle fill={"#6FCEEF"} cx={"34.6"} cy={"30.4"} r={"6"} />
            <path
              fill={"#6FCEEF"}
              d={
                "M68.1,30.4c0-4.8-5.4-8.9-14-11.3c0.3-1.3,0.6-2.5,0.8-3.7c1.1-7-0.1-12-3.5-14c-3.4-2-8.3-0.6-13.9,3.9c-0.9,0.8-1.9,1.6-2.8,2.6C28.3,1.7,22-1,17.9,1.4c-4.1,2.4-5,9.1-2.8,17.7c-8.6,2.4-14,6.5-14,11.3s5.4,8.8,14,11.3c-2.2,8.6-1.4,15.3,2.8,17.7c1,0.6,2.2,0.9,3.4,0.9c3.8,0,8.5-2.7,13.4-7.4c0.9,0.9,1.9,1.8,2.8,2.6c3.9,3.2,7.5,4.8,10.5,4.8c1.2,0,2.4-0.3,3.4-0.9c4.1-2.4,5-9.1,2.8-17.7C62.7,39.3,68.1,35.2,68.1,30.4z M39.4,7.7c3.3-2.7,6.3-4.1,8.5-4.1c0.7,0,1.4,0.2,1.9,0.5c2.2,1.3,3,5.3,2.1,10.9c-0.2,1.1-0.4,2.3-0.7,3.5c-2.7-0.6-5.7-1.1-8.9-1.3c-1.8-2.6-3.7-4.9-5.6-7C37.6,9.2,38.5,8.4,39.4,7.7z M43.9,35.8c-1,1.8-2.1,3.5-3.2,5.1c-1.9,0.1-4,0.2-6.1,0.2c-2.1,0-4.1-0.1-6.1-0.2c-1.1-1.6-2.2-3.4-3.2-5.1c-1-1.8-2-3.6-2.8-5.4c0.8-1.8,1.8-3.5,2.8-5.4c1-1.8,2.1-3.5,3.2-5.1c1.9-0.1,4-0.2,6.1-0.2c2.1,0,4.1,0.1,6.1,0.2c1.1,1.6,2.2,3.3,3.2,5.1c1,1.8,2,3.6,2.8,5.4C45.9,32.2,44.9,34,43.9,35.8z M48.3,33.9c0.8,1.9,1.5,3.8,2,5.6c-1.8,0.4-3.8,0.8-5.9,1c0.7-1.1,1.3-2.1,2-3.3C47.2,36.2,47.8,35.1,48.3,33.9z M34.6,48.6c-1.3-1.4-2.6-2.9-3.8-4.5c1.2,0.1,2.5,0.1,3.8,0.1c1.3,0,2.6,0,3.8-0.1C37.2,45.7,35.9,47.2,34.6,48.6z M24.7,40.5c-2.1-0.3-4-0.6-5.9-1c0.6-1.8,1.2-3.6,2-5.6c0.6,1.1,1.2,2.2,1.8,3.3C23.4,38.4,24.1,39.5,24.7,40.5z M20.9,26.9c-0.8-1.9-1.5-3.8-2-5.6c1.8-0.4,3.8-0.8,5.9-1c-0.7,1.1-1.3,2.1-2,3.3C22.1,24.7,21.5,25.8,20.9,26.9z M34.6,12.2c1.3,1.4,2.5,2.9,3.8,4.6c-1.2-0.1-2.5-0.1-3.8-0.1c-1.3,0-2.5,0-3.8,0.1C32.1,15.2,33.4,13.6,34.6,12.2z M46.5,23.6c-0.6-1.1-1.3-2.2-2-3.2c2.1,0.3,4,0.6,5.8,1c-0.6,1.8-1.2,3.7-2,5.6C47.8,25.8,47.2,24.7,46.5,23.6z M19.4,4c0.5-0.3,1.2-0.5,1.9-0.5c2.8,0,6.9,2.3,11.3,6.5c-1.9,2.1-3.8,4.4-5.6,6.9c-3.2,0.3-6.2,0.7-8.9,1.3C16.2,11,16.8,5.5,19.4,4z M4.1,30.4c0-3,4.4-6.2,11.8-8.3c0.8,2.7,1.9,5.5,3.3,8.3c-1.3,2.9-2.4,5.7-3.3,8.3C8.6,36.7,4.1,33.4,4.1,30.4z M19.4,56.8c-2.6-1.5-3.2-6.9-1.3-14.4c2.7,0.6,5.7,1.1,8.9,1.3c1.8,2.5,3.7,4.9,5.6,7C27,56.1,22,58.3,19.4,56.8z M49.9,56.8c-2.2,1.3-6-0.1-10.5-3.7c-0.9-0.7-1.8-1.5-2.6-2.4c1.9-2,3.8-4.4,5.6-7c3.2-0.3,6.1-0.7,8.9-1.3C53.1,49.9,52.5,55.3,49.9,56.8z M53.3,38.8c-0.8-2.7-1.9-5.5-3.3-8.4c1.3-2.8,2.4-5.6,3.2-8.3c7.4,2.1,11.8,5.3,11.8,8.4C65.1,33.4,60.7,36.7,53.3,38.8z"
              }
            />
            <g>
              <path
                fill={"#6FCEEF"}
                d={
                  "M79.2,31.8v10.8h-5.4v-27H84c3.1,0,5.5,0.7,7.2,2.1c1.7,1.4,2.6,3.4,2.6,5.9c0,1.4-0.4,2.6-1.1,3.6c-0.7,1-1.8,1.8-3.2,2.4c1.6,0.5,2.7,1.3,3.4,2.4c0.7,1.1,1,2.5,1,4.1v2c0,0.8,0.1,1.5,0.3,2.4c0.2,0.8,0.6,1.4,1,1.8v0.4h-5.6c-0.5-0.4-0.8-1.1-1-2s-0.2-1.8-0.2-2.6v-1.9c0-1.3-0.4-2.4-1.1-3.1c-0.7-0.7-1.8-1.1-3.1-1.1H79.2z M79.2,27.7h4.7c1.5,0,2.7-0.3,3.4-1c0.7-0.6,1.1-1.6,1.1-2.9c0-1.2-0.4-2.2-1.1-3c-0.7-0.7-1.9-1.1-3.3-1.1h-4.8V27.7z"
                }
              />
              <path
                fill={"#6FCEEF"}
                d={
                  "M107.3,43c-2.9,0-5.2-0.9-6.9-2.8c-1.7-1.9-2.6-4.2-2.6-7.1v-0.7c0-3,0.8-5.4,2.5-7.4c1.6-1.9,3.8-2.9,6.6-2.9c2.7,0,4.8,0.8,6.3,2.4c1.5,1.6,2.2,3.8,2.2,6.6v3h-12l0,0.1c0.1,1.3,0.5,2.4,1.3,3.3c0.8,0.9,1.9,1.3,3.2,1.3c1.2,0,2.2-0.1,3-0.4c0.8-0.2,1.7-0.6,2.6-1.1l1.5,3.3c-0.8,0.7-1.9,1.2-3.2,1.7C110.4,42.8,109,43,107.3,43z M106.9,26.4c-1,0-1.8,0.4-2.4,1.2c-0.6,0.8-0.9,1.8-1.1,3l0.1,0.1h6.6v-0.5c0-1.2-0.3-2.1-0.8-2.8C108.8,26.7,108,26.4,106.9,26.4z"
                }
              />
              <path
                fill={"#6FCEEF"}
                d={
                  "M130.4,42.6c-0.2-0.5-0.4-0.9-0.5-1.4c-0.1-0.5-0.2-1-0.3-1.6c-0.6,1-1.3,1.8-2.2,2.4c-0.9,0.6-2,1-3.3,1c-2.1,0-3.7-0.5-4.9-1.6c-1.1-1.1-1.7-2.6-1.7-4.4c0-2,0.8-3.5,2.3-4.6c1.5-1.1,3.7-1.6,6.6-1.6h3v-1.6c0-1-0.3-1.7-0.8-2.2c-0.5-0.5-1.3-0.8-2.2-0.8c-0.9,0-1.6,0.2-2,0.6c-0.5,0.4-0.7,1-0.7,1.8l-5.2,0l0-0.1c-0.1-1.7,0.6-3.2,2.2-4.4c1.6-1.2,3.6-1.8,6.1-1.8c2.4,0,4.3,0.6,5.8,1.8c1.5,1.2,2.2,3,2.2,5.2v8.3c0,0.9,0.1,1.8,0.2,2.7c0.1,0.8,0.4,1.7,0.7,2.5H130.4z M125.4,39c1,0,1.8-0.2,2.5-0.7c0.7-0.5,1.2-1,1.5-1.6v-2.8h-3c-1.2,0-2,0.3-2.6,0.9c-0.6,0.6-0.9,1.3-0.9,2.1c0,0.7,0.2,1.2,0.7,1.6S124.6,39,125.4,39z"
                }
              />
              <path
                fill={"#6FCEEF"}
                d={
                  "M147.4,38.9c1,0,1.7-0.3,2.3-0.8c0.6-0.6,0.9-1.3,0.9-2.2h4.9l0.1,0.1c0,2-0.7,3.7-2.3,5.1c-1.6,1.4-3.5,2-5.9,2c-3,0-5.3-0.9-6.9-2.8c-1.6-1.9-2.4-4.3-2.4-7.3v-0.6c0-3,0.8-5.4,2.4-7.3c1.6-1.9,3.9-2.9,6.9-2.9c2.5,0,4.5,0.7,6,2.1c1.5,1.4,2.2,3.3,2.2,5.6l0,0.1h-4.9c0-1-0.3-1.9-0.9-2.6c-0.6-0.7-1.4-1-2.4-1c-1.4,0-2.4,0.6-3,1.7c-0.6,1.1-0.9,2.5-0.9,4.3v0.6c0,1.8,0.3,3.2,0.9,4.3C144.9,38.3,146,38.9,147.4,38.9z"
                }
              />
              <path
                fill={"#6FCEEF"}
                d={
                  "M165.1,17.6v4.9h3.4v3.8h-3.4v10.2c0,0.8,0.2,1.3,0.5,1.7c0.3,0.3,0.8,0.5,1.3,0.5c0.3,0,0.5,0,0.7,0c0.2,0,0.4-0.1,0.7-0.2l0.5,3.9c-0.5,0.2-1.1,0.3-1.6,0.4c-0.5,0.1-1.1,0.1-1.7,0.1c-1.9,0-3.3-0.5-4.3-1.5c-1-1-1.5-2.7-1.5-4.9V26.4h-2.9v-3.8h2.9v-4.9H165.1z"
                }
              />
            </g>
          </svg>
        </div>

        <p>Home page description.</p>
      </div>
    </div>
  </>
);
