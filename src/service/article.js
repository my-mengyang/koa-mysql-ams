const connections = require("./index");
const dayjs = require("dayjs");

class ArticleService {
  async addArticle(query) {
    const { title, content, directory, tag, status } = query;
    let time = dayjs().unix();
    const statement = `INSERT INTO article (title,content,status,tag,directory,createTime,updateTime) VALUES(?,?,?,?,?,?,?)`;
    const labelStatement = `INSERT INTO article_label (article_id,label_id) VALUES(?,?)`;
    const res = await connections.execute(statement, [
      title,
      content,
      status,
      tag,
      directory,
      time,
      time,
    ]);
    let article_id = res[0].insertId;
    let directory_id = directory.split(",");
    let tag_id = tag.split(",");
    if (directory_id.length) {
      directory_id.forEach((item) => {
        let directoryRow = connections.execute(labelStatement, [
          article_id,
          item,
        ]);
      });
    }
    if (tag_id) {
      tag_id.forEach((item) => {
        let tagRow = connections.execute(labelStatement, [article_id, item]);
      });
    }
    return res[0];
  }
  async articleList(query) {
    const { nopage, start, limit, name, status, start_time, end_time } = query;
    let statement = `SELECT SQL_CALC_FOUND_ROWS article.title,
      article.id,
      article.content,
      article.directory,
      article.status,
      article.tag,
      article.comment_status,
      article.author,
      article.praise,
      article.createTime,
      article.updateTime,
      article.readVolume,
      JSON_ARRAYAGG(JSON_OBJECT('label_name', label.name, 'label_count', label.group_count,'label_type',label.type,'label_create_time',
                                label.create_time)) as label_data
FROM article
        LEFT JOIN article_label ON article.id = article_label.article_id
        LEFT JOIN label ON article_label.label_id = label.id
GROUP BY article.id HAVING article.createTime BETWEEN ${start_time || 0} AND ${
      end_time || dayjs().unix()
    }`;
    if (name) {
      statement += ` AND title LIKE '%${name}%'`;
    }
    if (status) {
      statement += ` AND status=${status}`;
    }
    statement += ` ORDER BY article.createTime DESC`;
    if (nopage == 0) {
      statement += ` LIMIT ${start * limit},${limit}`;
    }
    const res = await connections.execute(statement);
    let constSql = `SELECT FOUND_ROWS()`;
    const countRes = await connections.execute(constSql);
    return {
      data: res[0],
      count: countRes[0][0]["FOUND_ROWS()"],
    };
  }

  async getArticleDetailByArticleId(query) {
    const { id } = query;
    const statement = `SELECT article.id,
      article.title,
      article.content,
      article.directory,
      article.tag,
      article.status,
      article.comment_status,
      article.author,
      article.praise,
      article.createTime,
      article.updateTime,
      article.readVolume,
      JSON_ARRAYAGG(JSON_OBJECT('label_name', label.name, 'label_count', label.group_count, 'label_create_time',
                                label.create_time,'label_type',label.type,'label_id',label.id)) as label_data
FROM article
        JOIN article_label ON (article.id = article_label.article_id AND article.id = ${id})
        LEFT JOIN label ON article_label.label_id = label.id
GROUP BY article.id;`;
    const prev = `SELECT id,title FROM article WHERE id<${id} ORDER BY id DESC LIMIT 1`;
    const next = `SELECT id,title FROM article WHERE id>${id} ORDER BY id LIMIT 1`;
    const res = await connections.execute(statement);
    const res1 = await connections.execute(prev);
    const res2 = await connections.execute(next);
    let data = [res1[0][0] || {}, res[0][0], res2[0][0] || {}];
    return {
      data: data,
    };
  }
  async setStatusById(query) {
    const { id, status } = query;
    const statement = `UPDATE article SET status=${status} WHERE id=${id}`;
    const res = await connections.execute(statement);
    return res[0];
  }

  async setPraiseById(query) {
    const { id } = query;
    const statement = `UPDATE article SET praise =praise +1 WHERE id=${id}`;
    const res = await connections.execute(statement);
    return res[0];
  }

  async updateReadById(query) {
    const { id } = query;
    const statement = `UPDATE article SET readVolume =readVolume +1 WHERE id=${id}`;
    const res = await connections.execute(statement);
    return res[0];
  }

  async hotArticle(query) {
    const { start_time, end_time, nopage, start, limit } = query;
    let statement = `SELECT * FROM article WHERE updateTime BETWEEN ${
      start_time || 0
    } AND ${end_time || dayjs().unix()}`;
    statement += ` ORDER BY readVolume DESC`;
    if (nopage === 0) {
      statement += ` LIMIT ${start * limit},${limit}`;
    }
    console.log(statement);
    const res = await connections.execute(statement);
    return res[0];
  }
}

module.exports = new ArticleService();
