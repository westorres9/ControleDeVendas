
INSERT INTO tb_user(name, email, password, img_url ) VALUES ('Maria Brown', 'maria@gmail.com', '$2a$10$sJTnsO99MufYDAZLbR59reee38qQoPZzlaYEXY2G8HKVdH0N6q52G', 'https://user-images.githubusercontent.com/91570669/216034779-efa7f877-0ea6-4a70-b12e-4468d1d6324b.png');
INSERT INTO tb_role(authority) VALUES ('ROLE_SELLER');
INSERT INTO tb_role(authority) VALUES ('ROLE_MANAGER');
INSERT INTO tb_role(authority) VALUES ('ROLE_ADMIN');

INSERT INTO tb_user_role(user_id, role_id) VALUES (1,3);

