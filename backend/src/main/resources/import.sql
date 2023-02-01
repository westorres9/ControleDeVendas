INSERT INTO tb_team (name, img_url) VALUES ('Sharp','https://user-images.githubusercontent.com/91570669/216033463-b63f5066-0016-468c-97ac-33ef0ef20879.jpg');
INSERT INTO tb_team (name, img_url) VALUES ('Phillips','https://user-images.githubusercontent.com/91570669/216033459-0e09b464-6a5c-43a0-9db5-c43e2f633d51.png');
INSERT INTO tb_team (name, img_url) VALUES ('TCL Semp','https://user-images.githubusercontent.com/91570669/216033466-a22ca6ff-b409-4dfa-a9af-2897459a5b02.png');

INSERT INTO tb_user(name,email, password, team_id, img_url ) VALUES ('Logan','logan@gmail.com', '$2a$10$sJTnsO99MufYDAZLbR59reee38qQoPZzlaYEXY2G8HKVdH0N6q52G',1, 'https://user-images.githubusercontent.com/91570669/216034768-5a8cd167-b5ab-49da-b713-fdabbe7df2d7.png');
INSERT INTO tb_user(name,email, password, team_id, img_url ) VALUES ('Anakin','anakin@gmail.com', '$2a$10$sJTnsO99MufYDAZLbR59reee38qQoPZzlaYEXY2G8HKVdH0N6q52G',1, 'https://user-images.githubusercontent.com/91570669/216034766-887e2d48-b616-4458-9008-a18c9142d1b9.png');
INSERT INTO tb_user(name,email, password, team_id, img_url ) VALUES ('Aayla','aayla@gmail.com', '$2a$10$sJTnsO99MufYDAZLbR59reee38qQoPZzlaYEXY2G8HKVdH0N6q52G',2, 'https://user-images.githubusercontent.com/91570669/216034765-65575bcd-452a-4666-9068-deea3345bf0e.png');
INSERT INTO tb_user(name,email, password, team_id, img_url ) VALUES ('Chewbacca','chewbacca@gmail.com', '$2a$10$sJTnsO99MufYDAZLbR59reee38qQoPZzlaYEXY2G8HKVdH0N6q52G',2, 'https://user-images.githubusercontent.com/91570669/216036010-5e7de539-cf40-4a49-a13a-81e73319ab4b.png');
INSERT INTO tb_user(name,email, password, team_id, img_url ) VALUES ('Padme','padme@gmail.com', '$2a$10$sJTnsO99MufYDAZLbR59reee38qQoPZzlaYEXY2G8HKVdH0N6q52G',3, 'https://user-images.githubusercontent.com/91570669/216034758-20886cd6-0826-4a71-92f1-1747a902dd65.png');
INSERT INTO tb_user(name, email, password, img_url ) VALUES ('Alex Green', 'alex@gmail.com', '$2a$10$sJTnsO99MufYDAZLbR59reee38qQoPZzlaYEXY2G8HKVdH0N6q52G', 'https://user-images.githubusercontent.com/91570669/216034772-b8454ea9-7488-40ec-801c-5e09fb502583.png');
INSERT INTO tb_user(name, email, password, img_url ) VALUES ('Ana Blue', 'ana@gmail.com', '$2a$10$sJTnsO99MufYDAZLbR59reee38qQoPZzlaYEXY2G8HKVdH0N6q52G', 'https://user-images.githubusercontent.com/91570669/216034780-8994a50e-de2f-487a-9563-bacd31c62b98.png');
INSERT INTO tb_user(name, email, password, img_url ) VALUES ('Bob Brown', 'bob@gmail.com', '$2a$10$sJTnsO99MufYDAZLbR59reee38qQoPZzlaYEXY2G8HKVdH0N6q52G', 'https://user-images.githubusercontent.com/91570669/216034775-8265745d-d432-442a-962a-bbb1ccb0e871.png');
INSERT INTO tb_user(name, email, password, img_url ) VALUES ('Maria Brown', 'maria@gmail.com', '$2a$10$sJTnsO99MufYDAZLbR59reee38qQoPZzlaYEXY2G8HKVdH0N6q52G', 'https://user-images.githubusercontent.com/91570669/216034779-efa7f877-0ea6-4a70-b12e-4468d1d6324b.png');

INSERT INTO tb_role(authority) VALUES ('ROLE_SELLER');
INSERT INTO tb_role(authority) VALUES ('ROLE_MANAGER');
INSERT INTO tb_role(authority) VALUES ('ROLE_ADMIN');

INSERT INTO tb_user_role(user_id, role_id) VALUES (1,1);
INSERT INTO tb_user_role(user_id, role_id) VALUES (2,1);
INSERT INTO tb_user_role(user_id, role_id) VALUES (3,1);
INSERT INTO tb_user_role(user_id, role_id) VALUES (4,1);
INSERT INTO tb_user_role(user_id, role_id) VALUES (5,1);
INSERT INTO tb_user_role(user_id, role_id) VALUES (6,2);
INSERT INTO tb_user_role(user_id, role_id) VALUES (7,2);
INSERT INTO tb_user_role(user_id, role_id) VALUES (8,2);
INSERT INTO tb_user_role(user_id, role_id) VALUES (9,3);

INSERT INTO tb_team_manager(team_id, manager_id) VALUES (1,6);
INSERT INTO tb_team_manager(team_id, manager_id) VALUES (2,7);
INSERT INTO tb_team_manager(team_id, manager_id) VALUES (3,8);

INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (5,83,66,5501.0,'2022-04-01',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (5,113,78,8290.0,'2022-03-31',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (1,36,12,6096.0,'2022-03-30',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (1,42,22,3223.0,'2022-03-27',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (2,38,12,15017.0,'2022-03-26',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (5,88,52,20899.0,'2022-03-21',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (3,95,66,12383.0,'2022-03-17',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (3,117,78,10748.0,'2022-03-17',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (5,114,71,22274.0,'2022-03-15',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (3,127,96,19284.0,'2022-03-14',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (1,44,13,6871.0,'2022-03-09',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (3,49,25,9034.0,'2022-03-05',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (5,105,84,8114.0,'2022-03-04',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (3,94,65,21628.0,'2022-03-03',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (2,97,46,21707.0,'2022-02-28',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (4,104,71,12652.0,'2022-02-10',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (2,76,14,19349.0,'2022-02-09',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (3,154,78,21216.0,'2022-02-08',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (5,133,88,12561.0,'2022-02-03',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (2,50,31,15963.0,'2022-01-31',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (4,137,70,19349.0,'2022-01-25',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (2,53,33,9103.0,'2022-01-16',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (3,184,93,12927.0,'2022-01-10',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (1,35,12,6537.0,'2022-01-08',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (4,93,55,19890.0,'2022-01-01',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (4,168,92,6299.0,'2022-12-28',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (2,48,13,22411.0,'2022-12-26',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (2,107,67,9788.0,'2022-12-24',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (3,106,62,18942.0,'2022-12-20',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (2,40,26,11731.0,'2022-12-18',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (5,101,68,19882.0,'2022-12-18',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (5,185,100,14618.0,'2022-12-17',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (1,82,47,7951.0,'2022-12-15',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (1,86,45,4147.0,'2022-12-14',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (5,95,88,12943.0,'2022-12-09',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (3,75,58,18747.0,'2022-12-02',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (2,96,50,12624.0,'2022-12-01',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (4,79,40,14770.0,'2022-11-21',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (5,73,46,14124.0,'2022-11-20',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (5,92,58,20953.0,'2022-11-20',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (1,43,30,9690.0,'2022-11-18',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (4,58,30,11396.0,'2022-11-14',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (1,49,14,5119.0,'2022-11-14',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (2,53,23,8206.0,'2022-11-12',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (2,49,25,8269.0,'2022-11-10',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (2,53,29,17984.0,'2022-11-09',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (1,43,26,3056.0,'2022-11-08',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (2,51,21,8624.0,'2022-11-06',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (3,64,41,10959.0,'2022-11-03',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (2,75,23,15883.0,'2022-10-30',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (3,51,44,14038.0,'2022-10-27',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (4,141,81,13535.0,'2022-10-26',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (3,135,98,17241.0,'2022-10-25',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (3,116,66,16415.0,'2022-10-19',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (4,60,44,5329.0,'2022-10-14',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (4,63,32,16618.0,'2022-10-07',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (4,176,100,5062.0,'2022-10-01',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (2,118,45,22235.0,'2022-09-29',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (4,150,97,14484.0,'2022-09-26',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (2,115,63,18081.0,'2022-09-24',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (5,159,88,16101.0,'2022-09-23',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (4,76,45,11150.0,'2022-09-22',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (4,65,63,17982.0,'2022-09-09',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (3,90,68,15927.0,'2022-09-08',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (1,22,12,9793.0,'2022-09-06',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (1,19,11,4185.0,'2022-09-05',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (2,68,21,15541.0,'2022-09-04',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (3,64,47,7287.0,'2022-09-04',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (4,153,92,17913.0,'2022-09-04',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (5,93,53,12648.0,'2022-09-02',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (2,78,32,12022.0,'2022-08-30',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (2,94,49,18787.0,'2022-08-29',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (1,54,28,3974.0,'2022-08-28',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (2,45,25,5681.0,'2022-08-26',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (1,11,1,4008.0,'2022-08-14',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (5,118,80,5218.0,'2022-08-13',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (2,52,21,21220.0,'2022-08-09',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (2,127,23,8831.0,'2022-08-06',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (2,78,23,13900.0,'2022-08-04',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (3,102,52,22086.0,'2022-08-03',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (3,54,53,15731.0,'2022-07-31',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (3,173,93,10816.0,'2022-07-22',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (4,60,45,17633.0,'2022-07-20',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (4,138,72,14528.0,'2022-07-19',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (5,147,96,21582.0,'2022-07-17',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (1,32,12,9751.0,'2022-07-13',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (5,83,59,8496.0,'2022-07-08',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (5,58,48,5283.0,'2022-07-07',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (4,55,35,20474.0,'2022-07-05',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (2,84,34,5787.0,'2022-07-01',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (5,79,68,11976.0,'2022-06-27',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (3,121,67,18196.0,'2022-06-16',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (1,26,14,4255.0,'2022-06-14',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (5,55,42,13249.0,'2022-06-14',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (5,73,65,20751.0,'2022-06-10',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (1,47,25,7318.0,'2022-06-04',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (4,72,60,15608.0,'2022-06-03',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (4,97,68,8901.0,'2022-06-03',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (2,68,26,13231.0,'2022-06-02',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (3,73,53,19476.0,'2022-05-22',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (4,28,23,20530.0,'2022-05-18',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (1,83,44,4864.0,'2022-05-13',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (3,82,43,21753.0,'2022-05-06',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (1,43,26,7362.0,'2022-05-03',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (2,54,23,10549.0,'2022-04-28',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (5,125,84,13333.0,'2022-04-25',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (1,44,26,7431.0,'2022-04-23',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (4,46,25,21099.0,'2022-04-19',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (4,42,28,7217.0,'2022-04-19',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (2,52,21,10107.0,'2022-04-18',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (5,121,90,18174.0,'2022-04-17',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (1,65,14,8095.0,'2022-04-12',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (5,107,74,11507.0,'2022-04-12',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (3,140,74,11709.0,'2022-04-09',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (4,95,91,8288.0,'2022-04-08',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (2,68,43,17016.0,'2022-04-07',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (4,21,20,17126.0,'2022-04-03',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (1,38,15,7957.0,'2022-03-31',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (3,53,29,20903.0,'2022-03-29',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (1,19,10,3987.0,'2022-03-28',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (2,78,34,20795.0,'2022-03-27',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (1,83,44,4938.0,'2022-03-26',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (1,32,12,6926.0,'2022-03-13',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (1,64,33,8193.0,'2022-03-13',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (3,39,39,10557.0,'2022-03-05',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (3,158,84,21601.0,'2022-03-02',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (5,82,82,22465.0,'2022-02-27',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (3,68,56,12595.0,'2022-02-17',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (1,27,13,4636.0,'2022-02-16',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (4,52,33,10155.0,'2022-02-14',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (4,142,81,13610.0,'2022-02-13',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (5,81,45,15306.0,'2022-02-08',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (2,64,35,17460.0,'2022-02-07',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (2,48,24,21413.0,'2022-02-03',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (3,150,82,6505.0,'2022-01-26',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (4,138,95,7983.0,'2022-01-18',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (5,70,48,9564.0,'2022-01-16',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (3,162,84,7302.0,'2022-01-15',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (4,57,54,9126.0,'2022-01-12',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (4,78,60,5253.0,'2022-01-06',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (5,81,53,11553.0,'2022-01-04',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (2,90,34,16020.0,'2022-12-31',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (4,57,39,10253.0,'2022-12-28',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (4,90,53,14398.0,'2022-12-21',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (5,30,25,16429.0,'2022-12-16',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (2,58,21,5368.0,'2022-12-13',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (1,79,12,9928.0,'2022-12-13',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (3,98,77,8860.0,'2022-12-12',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (3,100,69,13335.0,'2022-12-09',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (1,41,21,7009.0,'2022-12-06',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (4,141,78,6100.0,'2022-12-04',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (5,52,36,7050.0,'2022-12-02',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (3,76,51,21591.0,'2022-12-01',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (4,38,35,19416.0,'2022-11-29',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (1,54,12,9400.0,'2022-11-26',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (1,43,25,4854.0,'2022-11-23',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (4,70,51,10740.0,'2022-11-21',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (3,84,78,6990.0,'2022-11-17',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (5,126,94,14183.0,'2022-11-17',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (5,89,89,17044.0,'2022-11-02',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (5,149,83,20988.0,'2022-11-01',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (5,139,76,7682.0,'2022-10-31',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (1,39,14,7996.0,'2022-10-29',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (1,44,25,5546.0,'2022-10-24',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (5,127,92,12347.0,'2022-10-23',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (3,53,35,16423.0,'2022-10-20',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (1,14,8,7705.0,'2022-10-16',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (2,71,18,6436.0,'2022-10-07',1);
INSERT INTO tb_sale(seller_id,visited,deals,amount,date,status) VALUES (3,78,60,6723.0,'2022-10-07',1);


