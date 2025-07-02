const { URLSearchParams } = require("url");

const newsBaseUrl = "/news";
const authBaseUrl = "/auth";

const generateAuthLinks = (user) => {
  if (user) {
    return [{ rel: "logout", href: `${authBaseUrl}/logout`, method: "POST" }];
  }
  return [
    { rel: "login", href: `${authBaseUrl}/login`, method: "POST" },
    { rel: "register", href: `${authBaseUrl}/register`, method: "POST" },
  ];
};

exports.generateNewsItemLinks = (newsItem, user) => {
  const links = [
    { rel: "self", href: `${newsBaseUrl}/${newsItem._id}`, method: "GET" },
    { rel: "collection", href: newsBaseUrl, method: "GET" },
  ];

  if (user && user.isAdmin) {
    links.push(
      { rel: "update", href: `${newsBaseUrl}/${newsItem._id}`, method: "PUT" },
      {
        rel: "delete",
        href: `${newsBaseUrl}/${newsItem._id}`,
        method: "DELETE",
      }
    );
  }

  return links.concat(generateAuthLinks(user));
};

exports.generateNewsCollectionLinks = (req, totalCount, page, limit, user) => {
  const links = [
    { rel: "self", href: `${newsBaseUrl}${req.url}`, method: "GET" },
  ];

  if (user && user.isAdmin) {
    links.push({ rel: "create", href: newsBaseUrl, method: "POST" });
  }

  const totalPages = Math.ceil(totalCount / limit);
  const queryParams = new URLSearchParams(req.query);

  if (totalPages > 1) {
    queryParams.set("page", "1");
    links.push({
      rel: "first",
      href: `${newsBaseUrl}?${queryParams.toString()}`,
      method: "GET",
    });
    if (page > 1) {
      queryParams.set("page", page - 1);
      links.push({
        rel: "prev",
        href: `${newsBaseUrl}?${queryParams.toString()}`,
        method: "GET",
      });
    }
    if (page < totalPages) {
      queryParams.set("page", page + 1);
      links.push({
        rel: "next",
        href: `${newsBaseUrl}?${queryParams.toString()}`,
        method: "GET",
      });
    }
    queryParams.set("page", totalPages);
    links.push({
      rel: "last",
      href: `${newsBaseUrl}?${queryParams.toString()}`,
      method: "GET",
    });
  }

  return links.concat(generateAuthLinks(user));
};

exports.generatePostDeletionLinks = (user) => {
  const links = [{ rel: "collection", href: newsBaseUrl, method: "GET" }];
  if (user && user.isAdmin) {
    links.push({ rel: "create", href: newsBaseUrl, method: "POST" });
  }

  return links.concat(generateAuthLinks(user));
};
