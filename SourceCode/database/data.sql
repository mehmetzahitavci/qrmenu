DELETE FROM products;


INSERT INTO products (name, nameen, description, descriptionen, price, image_url, featured, category_id, details) VALUES
('Espresso', 'Espresso', 'Yoğun ve aromatik İtalyan usulü espresso', 'Intense and aromatic Italian-style espresso', 100.00, '/images/espresso.png', true, 1, ''),
('Cappuccino', 'Cappuccino', 'Kremsi süt köpüğü ile klasik cappuccino', 'Classic cappuccino with creamy milk foam', 110.00, '/images/Cappucinno07.11.2025.png', true, 1, ''),
('Latte', 'Latte', 'Yumuşak espresso ve buharla ısıtılmış süt', 'Smooth espresso with steamed milk', 110.00, '/images/Latte07.11.2025_11zon.png', false, 1, ''),
('Macchiato', 'Macchiato', 'Espresso üzerine süt köpüğü', 'Espresso topped with milk foam', 120.00, '/images/Maccihiato07.11.202.png', true, 1, ''),
('Americano', 'Americano', 'Espresso ve sıcak su', 'Espresso and hot water', 105.00, '/images/Americano07.11.2025.png', false, 1, ''),
('Türk Kahvesi', 'Turkish Coffee', 'Geleneksel Türk kahvesi, köpüklü servis', 'Traditional Turkish coffee, served with foam', 100.00, '/images/241turkkahvesi.jpeg', true, 1, ''),
('Filtre Kahve', 'Filter Coffee', 'Taze demlenmiş filtre kahve', 'Freshly brewed filter coffee', 105.00, '/images/FiltreKahve12.11.2025.jpg', false, 1, '');


INSERT INTO products (name, nameen, description, descriptionen, price, image_url, featured, category_id, details) VALUES
('Ice Latte', 'Iced Latte', 'Soğuk süt ve buzlu espresso', 'Cold milk with iced espresso', 120.00, '/images/269ICEDLATTE.jpg', true, 2, ''),
('Ice Americano', 'Iced Americano', 'Buzlu americano', 'Iced americano coffee', 110.00, '/images/2013iceamericano.jpg', true, 2, ''),
('Ice Mocha', 'Iced Mocha', 'Buzlu çikolatalı kahve', 'Iced chocolate coffee', 125.00, '/images/Ice-mocha-1-9.jpg', false, 2, ''),
('Ice White Mocha', 'Iced White Mocha', 'Buzlu beyaz çikolatalı kahve', 'Iced white chocolate coffee', 125.00, '/images/Ice-white-mocha-1-10.jpg', false, 2, ''),
('Coca-Cola', 'Coca-Cola', 'Soğuk içecek', 'Cold beverage', 90.00, '/images/COLA.jpg', false, 2, ''),
('Fanta', 'Fanta', 'Portakallı gazlı içecek', 'Orange soda', 90.00, '/images/FANTA_.jpg', false, 2, ''),
('Sprite', 'Sprite', 'Limonlu gazlı içecek', 'Lemon-lime soda', 90.00, '/images/SPRITE_.jpg', false, 2, ''),
('Fuse Tea Şeftali', 'Fuse Tea Peach', 'Şeftalili buzlu çay', 'Peach iced tea', 90.00, '/images/FUSE_TEA_SEFTALI.jpg', false, 2, ''),
('Su', 'Water', 'Uludağ Su', 'Just Water', 90.00, '/images/su_uludag.jpg', false, 2, '');

INSERT INTO products (name, nameen, description, descriptionen, price, image_url, featured, category_id, details) VALUES
('Sıcak Çikolatalı Cookie', 'Hot Chocolate Cookie', 'Sıcak servis çikolatalı kurabiye', 'Warm served chocolate cookie', 250.00, '/images/HOTCHOCOLATECOOKIENEW.jpg', true, 3, ''),
('Lotus Kruvasan', 'Lotus Croissant', 'Lotus kremalı kruvasan', 'Croissant with Lotus cream', 280.00, '/images/LotusKruvasan2025.jpg', true, 3, ''),
('Waffle', 'Waffle', 'Taze waffle, çesitli soslarla', 'Fresh waffle with various toppings', 250.00, '/images/waffle.jpeg', false, 3, ''),
('Sütlaç', 'Rice Pudding', 'Geleneksel fırın sütlaç', 'Traditional baked rice pudding', 200.00, '/images/hamsikoysutlac.jpeg', false, 3, ''),
('Limonlu Pasta', 'Lemon Cake', 'Aşklan yoğruldu, sevgiylen tatlandı. Esmalişkoom için', 'Maded with love', 300000.00, '/images/limonlukek.jpg', false, 3, '');


INSERT INTO products (name, nameen, description, descriptionen, price, image_url, featured, category_id, details) VALUES
('Cheeseburger', 'Cheeseburger', 'Cheddar peynirli burger', 'Burger with cheddar cheese', 315.00, '/images/CHEESEBURGER-79.jpg', true, 4, ''),
('Hamburger', 'Hamburger', 'Klasik hamburger', 'Classic hamburger', 290.00, '/images/HAMBURGER-78.jpg', false, 4, ''),
('Tavuk Burger', 'Chicken Burger', 'Izgara tavuk burger', 'Grilled chicken burger', 250.00, '/images/TAVUKBURGER-6359-2.jpg', true, 4, '');


INSERT INTO products (name, nameen, description, descriptionen, price, image_url, featured, category_id, details) VALUES
('Sezar Salata', 'Caesar Salad', 'Klasik Sezar sos ile', 'With classic Caesar dressing', 220.00, '/images/SEZARSALATA-65.jpg', true, 5, ''),
('Ton Balıklı Salata', 'Tuna Salad', 'Taze ton balıklı salata', 'Fresh tuna salad', 240.00, '/images/TONBALIGISALATA-68.jpg', false, 5, ''),
('Gavurdağı Salatası', 'Gavurdagi Salad', 'Geleneksel Gavurdağı salatası', 'Traditional Gavurdagi salad', 185.00, '/images/GAVURDAGI_SALATASI.jpg', false, 5, '');


INSERT INTO products (name, nameen, description, descriptionen, price, image_url, featured, category_id, details) VALUES
('Pizza Margherita', 'Pizza Margherita', 'Domates sos, mozzarella, fesleğen', 'Tomato sauce, mozzarella, basil', 310.00, '/images/PIZZAMARGHERITAISTANBUL.jpg', true, 6, ''),
('Pizza Kavurmalı', 'Meat Pizza', 'Kavurma, biber, domates', 'Roasted meat, peppers, tomatoes', 385.00, '/images/PIZZAKAVURMALIISTANBUL.jpg', false, 6, ''),
('Mexican Pizza', 'Mexican Pizza', 'Baharatlı Meksika pizzası', 'Spicy Mexican pizza', 295.00, '/images/PizzaMexican7291.jpg', false, 6, ''),
('Penne Arrabiata', 'Penne Arrabiata', 'Baharatlı domates soslu makarna', 'Spicy tomato sauce pasta', 225.00, '/images/PENNEARRABIATTA-6467.jpg', false, 6, ''),
('Spaghetti Bolonez', 'Spaghetti Bolognese', 'Kıymalı bolonez sos ile', 'With meat bolognese sauce', 245.00, '/images/SPHAGETTIBOLONEZ-73.jpg', true, 6, ''),
('Tagliatelle Alfredo', 'Tagliatelle Alfredo', 'Kremalı alfredo sos ile', 'With creamy alfredo sauce', 235.00, '/images/TAGLIATELLIALFREDO-77.jpg', false, 6, '');
