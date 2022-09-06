INSERT INTO tb_user (name, email, password) VALUES ('Ana', 'ana@gmail.com', '123456');
INSERT INTO tb_user (name, email, password) VALUES ('Bob', 'bob@gmail.com', '123456');
INSERT INTO tb_user (name, email, password) VALUES ('Maria', 'maria@gmail.com', '123456');

INSERT INTO tb_role (authority) VALUES ('ROLE_SELLER');
INSERT INTO tb_role (authority) VALUES ('ROLE_MANAGER');
INSERT INTO tb_role (authority) VALUES ('ROLE_ADMIN');

INSERT INTO tb_user_role (user_id, role_id) VALUES (1,1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2,2);
INSERT INTO tb_user_role (user_id, role_id) VALUES (3,3);


INSERT INTO tb_sale (date,visited, deals, amount) VALUES ('2022-06-16',11,65,18196.0);
INSERT INTO tb_sale (date,visited, deals, amount) VALUES ('2022-06-15',16,45,786.0);
INSERT INTO tb_sale (date,visited, deals, amount) VALUES ('2022-06-14',18,32,2134.0);
  
INSERT INTO tb_team (name) VALUES ('Bradesco');
INSERT INTO tb_team (name) VALUES ('Santander');
INSERT INTO tb_team (name) VALUES ('Picpay');