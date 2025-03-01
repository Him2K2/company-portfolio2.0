const DataManager = require("../data-manager");

class PortfolioService {
  constructor() {}

  getById(id) {
    const { portfolios, companies, products, product_img, product_portfolio, employees, employee_portfolio, portfolio_pages, templates , service} = DataManager.allData;

    // Lấy portfolio theo id
    const portfolio = portfolios[id];
    if (!portfolio) {
      throw new Error(`Không tìm thấy portfolio với id: ${id}`);
    }

    // Lấy công ty liên quan đến portfolio
    const company = companies.find((c) => c.id === portfolio.company_id);

    // Lấy product_id từ bảng product_portfolio theo portfolio_id
    const productPortfolioIds = product_portfolio
      .filter((pp) => pp.portfolio_id === portfolio.id)
      .map((pp) => pp.product_id);

    // Lọc sản phẩm theo product_id tìm được
    const portfolioProducts = products.filter((p) =>
      productPortfolioIds.includes(p.id)
    );

    // Thêm hình ảnh cho từng sản phẩm
    const productsData = portfolioProducts.map((product) => {
      const images = product_img.filter((img) => img.product_id === product.id);
      return {
        ...product,
        img: images,
      };
    });

    // Lấy employee_id từ bảng employee_portfolio theo portfolio_id
    const employeePortfolioIds = employee_portfolio
      .filter((ep) => ep.portfolio_id === portfolio.id)
      .map((ep) => ep.employee_id);

    // Lọc nhân viên theo employee_id tìm được
    const portfolioEmployees = employees.filter((e) =>
      employeePortfolioIds.includes(e.id)
    );

    // Lấy các trang liên quan đến portfolio
    const pages = portfolio_pages.filter((page) => page.portfolio_id === portfolio.id);

    // Lấy template_id từ bảng portfolio_pages
    const templateIds = pages.map((page) => page.template_id);

    // Lấy template tương ứng với template_id
    const portfolioTemplate = templates.filter((t) => templateIds.includes(t.id));

    //

    // Tổng hợp dữ liệu trả về
    const portfolioData = {
      portfolio,
      company,
      productsData,
      portfolioEmployees,
      pages,
      portfolioTemplate,
      service,
    };

    return portfolioData;
  }
}

module.exports = PortfolioService;
  