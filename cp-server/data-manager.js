const axios = require("axios");
const XLSX = require("xlsx");

class DataManager {
  allData;

  constructor() {}

  static fetchData = async (url) => {
    try {
      const response = await axios.get(url, { responseType: "arraybuffer" });
      const data = new Uint8Array(response.data);
      const workbook = XLSX.read(data, { type: "array" });
  
      // Chuyển toàn bộ các sheet thành object { sheetName: jsonData }
      DataManager.allData = workbook.SheetNames.reduce((acc, sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        acc[sheetName] = XLSX.utils.sheet_to_json(sheet); // Chuyển thành JSON
        return acc;
      }, {});
    } catch (error) {
      console.error("Lỗi khi tải hoặc đọc file:", error);
    }
  };
}

module.exports = DataManager
