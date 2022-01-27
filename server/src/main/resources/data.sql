INSERT INTO restaurant (ID, NAME, PHOTOS, LOCATION) VALUES (1001, 'BBC Food Hall', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsB-YPDrL77fXqxZsUbUUx3B5xCCya433-UA&usqp=CAU', '52.21313391593327, 5.19129543631671');
INSERT INTO restaurant (ID, NAME, PHOTOS, LOCATION) VALUES (1002, 'Jackie Joyner''s Salad Bar', 'https://www.hutten.eu/_cache/hutten-corporate/media/vdpn100422/Nike_Knoppen_webshop_800x600px_stretch_width800_height600_crop-x50y50_compression50.jpg?hash=713e30852a6c1b5a', '52.21252584112826, 5.19003237878844');
INSERT INTO restaurant (ID, NAME, PHOTOS, LOCATION) VALUES (1003, 'Eric''s Sandwich Bar', 'https://www.hutten.eu/_cache/hutten-corporate/media/rxtj100423/Nike_Knoppen_webshop_800x600px2_stretch_width800_height600_crop-x50y50_compression50.jpg?hash=61e737a5039377e3', '52.2125064931548, 5.1911961960937445');
INSERT INTO restaurant (ID, NAME, PHOTOS, LOCATION) VALUES (1004, 'RTV The Van Food Truck', 'https://www.hutten.eu/_cache/hutten-corporate/media/tfpj100424/Nike_Knoppen_webshop_800x600px3_stretch_width800_height600_crop-x50y50_compression50.jpg?hash=80d4a76be88b1f6b', '52.212990189916695, 5.1923825680319435');
INSERT INTO restaurant (ID, NAME, PHOTOS, LOCATION) VALUES (1005, 'Olympia Recharge Bar', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsB-YPDrL77fXqxZsUbUUx3B5xCCya433-UA&usqp=CAU', '52.21221336161482, 5.195875022336012');

INSERT INTO menu_item (ID, NAAM, TYPE, PRICE, MENU_ITEM_BY_RESTAURANT_ID) VALUES (111001, 'Fruit salad', 'BREAKFAST', 3.95, 1001);
INSERT INTO menu_item (ID, NAAM, TYPE, PRICE, MENU_ITEM_BY_RESTAURANT_ID) VALUES (111002, 'Yoghurt', 'BREAKFAST', 2.90, 1001);
INSERT INTO menu_item (ID, NAAM, TYPE, PRICE, MENU_ITEM_BY_RESTAURANT_ID) VALUES (111003, 'Pizza Shoarma', 'LUNCH', 6.95, 1001);
INSERT INTO menu_item (ID, NAAM, TYPE, PRICE, MENU_ITEM_BY_RESTAURANT_ID) VALUES (111004, 'Pizza Hawaii', 'LUNCH', 5.50, 1001);
INSERT INTO menu_item (ID, NAAM, TYPE, PRICE, MENU_ITEM_BY_RESTAURANT_ID) VALUES (111005, 'Pasta Carbonara', 'DINNER', 5.95, 1001);
INSERT INTO menu_item (ID, NAAM, TYPE, PRICE, MENU_ITEM_BY_RESTAURANT_ID) VALUES (111006, 'Pad Thai', 'DINNER', 6.00, 1001);
INSERT INTO menu_item (ID, NAAM, TYPE, PRICE, MENU_ITEM_BY_RESTAURANT_ID) VALUES (111007, 'Bubble tea', 'DRINKS', 4.00, 1001);
INSERT INTO menu_item (ID, NAAM, TYPE, PRICE, MENU_ITEM_BY_RESTAURANT_ID) VALUES (111008, 'Coca Cola', 'DRINKS', 2.50, 1001);

INSERT INTO menu_item (ID, NAAM, TYPE, PRICE, MENU_ITEM_BY_RESTAURANT_ID) VALUES (111009, 'Jackies Pancakes', 'BREAKFAST', 4.95, 1002);
INSERT INTO menu_item (ID, NAAM, TYPE, PRICE, MENU_ITEM_BY_RESTAURANT_ID) VALUES (111010, 'Yoghurt', 'BREAKFAST', 2.90, 1002);
INSERT INTO menu_item (ID, NAAM, TYPE, PRICE, MENU_ITEM_BY_RESTAURANT_ID) VALUES (111011, 'Healthy salad', 'LUNCH', 6.95, 1002);
INSERT INTO menu_item (ID, NAAM, TYPE, PRICE, MENU_ITEM_BY_RESTAURANT_ID) VALUES (111012, 'Burrata salad', 'LUNCH', 5.50, 1002);
INSERT INTO menu_item (ID, NAAM, TYPE, PRICE, MENU_ITEM_BY_RESTAURANT_ID) VALUES (111013, 'Orzo salad with pineapple', 'DINNER', 5.95, 1002);
INSERT INTO menu_item (ID, NAAM, TYPE, PRICE, MENU_ITEM_BY_RESTAURANT_ID) VALUES (111014, 'Thai salad', 'DINNER', 6.00, 1002);
INSERT INTO menu_item (ID, NAAM, TYPE, PRICE, MENU_ITEM_BY_RESTAURANT_ID) VALUES (111015, 'Coffee', 'DRINKS', 4.00, 1002);
INSERT INTO menu_item (ID, NAAM, TYPE, PRICE, MENU_ITEM_BY_RESTAURANT_ID) VALUES (111016, 'Club soda', 'DRINKS', 2.50, 1002);

INSERT INTO menu_item (ID, NAAM, TYPE, PRICE, MENU_ITEM_BY_RESTAURANT_ID) VALUES (111017, 'Breakfast sandwich', 'BREAKFAST', 4.95, 1003);
INSERT INTO menu_item (ID, NAAM, TYPE, PRICE, MENU_ITEM_BY_RESTAURANT_ID) VALUES (111018, 'Croissant', 'BREAKFAST', 2.90, 1003);
INSERT INTO menu_item (ID, NAAM, TYPE, PRICE, MENU_ITEM_BY_RESTAURANT_ID) VALUES (111019, 'Club sandwich', 'LUNCH', 6.95, 1003);
INSERT INTO menu_item (ID, NAAM, TYPE, PRICE, MENU_ITEM_BY_RESTAURANT_ID) VALUES (111020, 'BLT sandwich', 'LUNCH', 5.50, 1003);
INSERT INTO menu_item (ID, NAAM, TYPE, PRICE, MENU_ITEM_BY_RESTAURANT_ID) VALUES (111021, 'Fry-up Deluxe', 'DINNER', 5.95, 1003);
INSERT INTO menu_item (ID, NAAM, TYPE, PRICE, MENU_ITEM_BY_RESTAURANT_ID) VALUES (111022, 'The FAT burger', 'DINNER', 8.00, 1003);
INSERT INTO menu_item (ID, NAAM, TYPE, PRICE, MENU_ITEM_BY_RESTAURANT_ID) VALUES (111023, 'Alcohol free beer', 'DRINKS', 4.00, 1003);
INSERT INTO menu_item (ID, NAAM, TYPE, PRICE, MENU_ITEM_BY_RESTAURANT_ID) VALUES (111024, 'Fanta', 'DRINKS', 2.50, 1003);

INSERT INTO menu_item (ID, NAAM, TYPE, PRICE, MENU_ITEM_BY_RESTAURANT_ID) VALUES (1025, 'Bacon and eggs', 'LUNCH', 6.95, 1004);
INSERT INTO menu_item (ID, NAAM, TYPE, PRICE, MENU_ITEM_BY_RESTAURANT_ID) VALUES (1026, 'Asian bun with tofu', 'LUNCH', 5.50, 1004);
INSERT INTO menu_item (ID, NAAM, TYPE, PRICE, MENU_ITEM_BY_RESTAURANT_ID) VALUES (1027, 'Steak with fries', 'DINNER', 5.95, 1004);
INSERT INTO menu_item (ID, NAAM, TYPE, PRICE, MENU_ITEM_BY_RESTAURANT_ID) VALUES (1028, 'Hotdog Deluxe', 'DINNER', 8.00, 1004);
INSERT INTO menu_item (ID, NAAM, TYPE, PRICE, MENU_ITEM_BY_RESTAURANT_ID) VALUES (1029, 'Beer', 'DRINKS', 4.00, 1004);
INSERT INTO menu_item (ID, NAAM, TYPE, PRICE, MENU_ITEM_BY_RESTAURANT_ID) VALUES (1030, 'Cassis', 'DRINKS', 2.50, 1004);

INSERT INTO menu_item (ID, NAAM, TYPE, PRICE, MENU_ITEM_BY_RESTAURANT_ID) VALUES (1031, 'Bacon and eggs', 'LUNCH', 6.95, 1004);
INSERT INTO menu_item (ID, NAAM, TYPE, PRICE, MENU_ITEM_BY_RESTAURANT_ID) VALUES (1032, 'Asian bun with tofu', 'LUNCH', 5.50, 1004);
INSERT INTO menu_item (ID, NAAM, TYPE, PRICE, MENU_ITEM_BY_RESTAURANT_ID) VALUES (1033, 'Power proteine shake', 'DRINKS', 4.00, 1004);
INSERT INTO menu_item (ID, NAAM, TYPE, PRICE, MENU_ITEM_BY_RESTAURANT_ID) VALUES (1034, 'Refuel juice', 'DRINKS', 6.50, 1004);

INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1035, '8PM', 0, '9AM', 1001);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1036, '8PM', 1, '9AM', 1001);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1037, '8PM', 2, '9AM', 1001);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1038, '8PM', 3, '9AM', 1001);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1039, '8PM', 4, '9AM', 1001);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1040, '10PM', 5, '11AM', 1001);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1041, '10PM', 6, '11AM', 1001);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1042, '8PM', 0, '9AM', 1002);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1043, '8PM', 1, '9AM', 1002);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1044, '8PM', 2, '9AM', 1002);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1045, '8PM', 3, '9AM', 1002);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1046, '8PM', 4, '9AM', 1002);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1047, '10PM', 5, '11AM', 1002);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1048, '10PM', 6, '11AM', 1002);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1049, '8PM', 0, '9AM', 1002);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1050, '8PM', 1, '9AM', 1002);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1051, '8PM', 2, '9AM', 1002);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1052, '8PM', 3, '9AM', 1002);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1053, '8PM', 4, '9AM', 1002);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1054, '10PM', 5, '11AM', 1002);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1055, '10PM', 6, '11AM', 1002);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1056, '8PM', 0, '9AM', 1003);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1057, '8PM', 1, '9AM', 1003);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1058, '8PM', 2, '9AM', 1003);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1059, '8PM', 3, '9AM', 1003);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1060, '8PM', 4, '9AM', 1003);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1061, '10PM', 5, '11AM', 1003);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1062, '10PM', 6, '11AM', 1003);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1063, '8PM', 0, '9AM', 1004);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1064, '8PM', 1, '9AM', 1004);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1065, '8PM', 2, '9AM', 1004);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1066, '8PM', 3, '9AM', 1004);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1067, '8PM', 4, '9AM', 1004);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1068, '10PM', 5, '11AM', 1004);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1069, '10PM', 6, '11AM', 1004);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1070, '8PM', 0, '9AM', 1005);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1071, '8PM', 1, '9AM', 1005);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1072, '8PM', 2, '9AM', 1005);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1073, '8PM', 3, '9AM', 1005);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1074, '8PM', 4, '9AM', 1005);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1075, '10PM', 5, '11AM', 1005);
INSERT INTO OPENINGS_HOURS (ID, CLOSING_TIME, DAY, OPEN_TIME, OPENINGS_HOURS_BY_RESTAURANT) VALUES (1076, '10PM', 6, '11AM', 1005);