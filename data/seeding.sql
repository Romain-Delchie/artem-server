BEGIN;
TRUNCATE TABLE "quotation_has_product", "product", "range", "quotation", "delivery", "account", "profile" RESTART IDENTITY;

INSERT INTO "profile" ("name", "discount")
VALUES
('utilisateur', '2.5'),
('revendeur', '1');


INSERT INTO "account" ("email", "company", "firstname", "lastname", "phone_number", "password", "invoice_address", "role", "profile_id")
VALUES
  ('test@test.fr', 'Techni-fournil', 'Jean', 'Garnier', '0123456789', '$2b$10$NW8QoaLybPfVjJ5Q5zDJ/ucqL8WZEiMQZoVvl8OSXU5OHF3CxWEqK', '1 Boulevard de Belleville 75000 Paris', 'user', '2'),
  ('arnaud.toury@artem-fr.com', 'Artem', 'Arnaud', 'Toury', '0164112461', '$2b$10$NW8QoaLybPfVjJ5Q5zDJ/ucqL8WZEiMQZoVvl8OSXU5OHF3CxWEqK', '16 rue de Berlin 77144 Montévrain', 'admin', '2'),
  ('test1@test.fr', 'Boulangerie de la gare', 'Frederic', 'Babin', '0160142584', '$2b$10$NW8QoaLybPfVjJ5Q5zDJ/ucqL8WZEiMQZoVvl8OSXU5OHF3CxWEqK', '35 rue de la gare 85000 La roche sur yon', 'user', '1');
  

INSERT INTO "delivery" ("delivery_address", "account_id")
VALUES
  ('Boulangerie Mon client, 10 rue du client, 75012 Paris', 1);

INSERT INTO "quotation" ("shipment", "account_id")
VALUES
  (true, 1);

INSERT INTO "range" ("name", "description", "image_link")
VALUES
  ('Toile enfourneur', 'Découvrez nos toiles enfourneur en coton de qualité supérieure, résistantes et durables. Avec des ourlets rentrés pour éviter l''effilochage, ces toiles sont confectionnées avec un fil Kevlar résistant aux hautes températures. Fermeture de toile à recouvrement, cordon ou sangle avec barre inox sertie ou non suivant vos préférences. Profitez de leur fonctionnalité optimale. Choisissez la qualité et notre expertise pour des performances inégalées.', 'te.jpg'),
  ('Toile de couche', 'Découvrez notre gamme de toiles de couche pour la boulangerie. Choisissez parmi nos options de haute qualité, notamment la toile Arlin en 100% lin (380g/m2) matière utilisée communément pour les toiles de couche, et la toile Arconet, un mélange de lin, coton et polyester (320g/m2) avec traitement hydrofuge et anti bactérien pour limiter le farinage et favoriser un séchage rapide. Disponibles en rouleaux de 50m ou en toiles confectionnées avec ourlets ou ourlets et cordons. La solution idéale pour une utilisation professionnelle en boulangerie.', 'tdl.jpg');

INSERT INTO "product" ("reference", "name", "designation", "description", "image_link", "brand", "price", "unit", "weight", "delivery_time", "stock", "range_id")
VALUES
  ('TE_70X30_3S_B', 'Toile enfourneur', 'Toile Enfour. BONGARD CS8T (3050 x 705) 3 sangles + boucles + barres', 'Toile enfourneur en Coton 500g/m2 à 3 sangles avec barres inox serties pour four Bongard réf: CS8T', 'TE_Bong.jpg', 'Bongard', 58.07, 1, 2.5,'0 jours', true, 1);
  
INSERT INTO "quotation_has_product" ("quotation_id", "product_id", "quantity")
VALUES
  (1, 1, 2);
  
COMMIT;