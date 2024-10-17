DROP DATABASE IF EXISTS nc_news_test;
DROP DATABASE IF EXISTS nc_news;

CREATE DATABASE nc_news_test;
CREATE DATABASE nc_news;

\c nc_news_test

SELECT articles.article_id, articles.author, articles.title, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id) AS comment_count  FROM articles  LEFT OUTER JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id ORDER BY created_at;