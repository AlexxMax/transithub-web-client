const generateStationContent = (station, context) => {
  const headerContainerStyle = `
    margin: 0 10px;
    padding: 10px 0;
    display: flex;
    flex-direction: row;
  `;
  const headerTitleStyle = "font-size: 20px";
  const headerCodeStyle = `
    font-size: 14px;
    padding-left: 10px;
    margin-top: 12px;
  `;
  const headerSubtitleStyle = `
    margin: -34px 10px 0;
    font-size: 14px;
  `;
  const headerBottomSubtitleStyle = `
    margin: -8px 10px 10px;
    font-size: 12px;
  `;
  const headerCountersStyle = `
    margin: 10px;
  `;
  const listContainerStyle = `
    margin: 10px 0;
    padding: 5px 0;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    max-height: 400px;
  `;

  let content = `
  <div style="${headerContainerStyle}">
    <p style="${headerTitleStyle}">${station.stationName}</p>
    <span style="${headerCodeStyle}">${station.stationRWCode}</span>
  </div>

  <p style="${headerSubtitleStyle}">${station.stationRoad}</p>
  `;

  if (station.polygonName) {
    content += `
    <p style="${headerBottomSubtitleStyle}">${station.polygonName}</p>
    `;
  }

  content += `
  <div style="${headerCountersStyle}">
    <div>
      <span>${context.$t("forms.common.railwayaggregationsCount")}:</span>
      <span>${station.railwayAggregations.length}</span>
    </div>

    <div>
      <span>${context.$t("forms.railwayAggregator.wagonsDeficit")}:</span>
      <span>${station.railwayAggregationsWagonsDeficit}</span>
    </div>
  </div>
  `;

  if (station.railwayAggregations) {
    content += `<div style="${listContainerStyle}">`;

    station.railwayAggregations.forEach(ra => {
      const cartContainerStyle = `
        margin: 5px 10px;
      `;
      const cartLinkStyle = `
        text-decoration: none;
        color: inherit;
      `;
      const cartInnerContainerStyle = `
        display: flex;
        flex-direction: column;
        border-radius: 10px;
        padding: 10px;
        cursor: pointer;
        color: #303133;
      `;
      const cartRow = `
        display: flex;
        flex-direction: row;
      `;
      const statusDotStyle = `
        background-color: ${ra.status.color};
        height: 10px;
        width: 10px;
        border-radius: 50%;
        margin: 2px;
      `;
      const labelTitleStyle = "font-weight: 500";

      const linkOnClick = `$nuxt.$store.commit('railwayAggregationsMap/SET_RAILWAY_AGGREGATION_ID_TO_OPEN', ${
        ra.guid
      })`;

      content += `
      <div style="${cartContainerStyle}">
        <a style="${cartLinkStyle}" onclick="${linkOnClick}">
          <div style="${cartInnerContainerStyle}" class="el-card is-hover-shadow">
            <div>
              <span style="${labelTitleStyle}">${context.$t(
        "forms.common.initiator"
      )}:</span>
              <span>${ra.companyName}/${ra.userFullname}</span>
            </div>

            <div>
              <span style="${labelTitleStyle}">${context.$t(
        "forms.common.goods"
      )}:</span>
              <span>${ra.goodsName}</span>
            </div>

            <div>
              <span style="${labelTitleStyle}">${context.$t(
        "forms.railwayAggregator.wagonsDeficit"
      )}:</span>
              <span>${ra.wagonsDeficit}</span>
            </div>

            <div style="${cartRow}">
              <div>
                <span style="${labelTitleStyle}">${context.$t(
        "forms.common.number"
      )}:</span>
                <span>${ra.number}</span>
              </div>
              <span style="${statusDotStyle}"></span>
            </div>
          </div>
        </a>
      </div>
      `;
    });

    content += `</div>`;
  }

  return content;
};

const generateRouteStationContent = (station, context) => {
  const headerContainerStyle = `
   margin: 0 10px;
   padding: 10px 0;
   display: flex;
   flex-direction: row;
 `;
  const headerTitleStyle = "font-size: 20px";
  const headerCodeStyle = `
   font-size: 14px;
   padding-left: 10px;
   margin-top: 12px;
 `;
  const headerSubtitleStyle = `
   margin: -34px 10px 0;
   font-size: 14px;
   padding-bottom: 10px;
 `;
  const headerBottomSubtitleStyle = `
    margin: -10px 10px 10px;
    font-size: 12px;
  `;
  const headerSubtitleInfoStyle = `
   color: #BC28FF;
   margin: 0 10px;
 `;

  const content = `
 <div style="${headerContainerStyle}">
   <p style="${headerTitleStyle}">${station.stationName}</p>
   <span style="${headerCodeStyle}">${station.stationRWCode}</span>
 </div>

 <p style="${headerSubtitleStyle}">${station.stationRoad}</p>
 <p style="${headerBottomSubtitleStyle}">${station.polygonName}</p>
 <p style="${headerSubtitleInfoStyle}">${context.$t(
    "forms.common.routeRailwayStation"
  )}<p>
 `;

  return content;
};

const generateBlankStationContent = station => {
  const headerContainerStyle = `
   margin: 0 10px;
   padding: 10px 0;
   display: flex;
   flex-direction: row;
 `;
  const headerTitleStyle = "font-size: 20px";
  const headerCodeStyle = `
   font-size: 14px;
   padding-left: 10px;
   margin-top: 12px;
 `;
  const headerSubtitleStyle = `
   margin: -34px 10px 0;
   font-size: 14px;
   padding-bottom: 10px;
 `;
  const headerBottomSubtitleStyle = `
    margin: -10px 10px 10px;
    font-size: 12px;
  `;

  const content = `
 <div style="${headerContainerStyle}">
   <p style="${headerTitleStyle}">${station.stationName}</p>
   <span style="${headerCodeStyle}">${station.stationRWCode}</span>
 </div>

 <p style="${headerSubtitleStyle}">${station.stationRoad}</p>
 <p style="${headerBottomSubtitleStyle}">${station.polygonName}</p>
 `;

  return content;
};

const generateReferenceStationContent = (station, context) => {
  const headerContainerStyle = `
    margin: 0 10px;
    padding: 10px 0;
    display: flex;
    flex-direction: row;
  `;
  const headerTitleStyle = "font-size: 20px";
  const headerCodeStyle = `
    font-size: 14px;
    padding-left: 10px;
    margin-top: 12px;
  `;
  const headerSubtitleStyle = `
    margin: -34px 10px 0;
    font-size: 14px;
    padding-bottom: 10px;
  `;

  const headerSubtitleInfoStyle = `
    color: #00A0FF;
    margin: 0 10px;
  `;

  const content = `
  <div style="${headerContainerStyle}">
    <p style="${headerTitleStyle}">${station.stationReferenceName}</p>
    <span style="${headerCodeStyle}">${station.stationReferenceRWCode}</span>
  </div>

  <p style="${headerSubtitleStyle}">${station.stationReferenceRoad}</p>

  <p style="${headerSubtitleInfoStyle}">${context.$t(
    "forms.common.stationMiddle"
  )}<p>
  `;

  return content;
};

export default {
  generateStationContent,
  generateRouteStationContent,
  generateBlankStationContent,
  generateReferenceStationContent
};
