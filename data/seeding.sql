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
  ('Boulangerie Mon client, 10 rue du client, 75012 Paris', 1),
  ('Boulangerie Au pain d''antan, 17 rue de Paris 77420 Champs sur marne', 1);

INSERT INTO "quotation" ("shipment", "account_id", "reference")
VALUES
  (true, 1, 'Boulangerie Thiago'),
  (true, 1, 'Boulangerie Au pain d''antan');

INSERT INTO "range" ("name", "description", "image_link")
VALUES
  ('Toile enfourneur', 'Découvrez nos toiles enfourneur en coton de qualité supérieure, résistantes et durables. Avec des ourlets rentrés pour éviter l''effilochage, ces toiles sont confectionnées avec un fil Kevlar résistant aux hautes températures. Fermeture de toile à recouvrement, cordon ou sangle avec barre inox sertie ou non suivant vos préférences. Profitez de leur fonctionnalité optimale. Choisissez la qualité et notre expertise pour des performances inégalées.', 'te.jpg'),
  ('Toile de couche', 'Découvrez notre gamme de toiles de couche pour la boulangerie. Choisissez parmi nos options de haute qualité, notamment la toile Arlin en 100% lin (380g/m2) matière utilisée communément pour les toiles de couche, et la toile Arconet, un mélange de lin, coton et polyester (320g/m2) avec traitement hydrofuge et anti bactérien pour limiter le farinage et favoriser un séchage rapide. Disponibles en rouleaux de 50m ou en toiles confectionnées avec ourlets ou ourlets et cordons. La solution idéale pour une utilisation professionnelle en boulangerie.', 'tdl.jpg'),
  ('Tapis de façonneuse', 'Découvrez notre gamme de tapis de façonnage répondant à vos besoins spécifiques, qu''il s''agisse d''un façonnage horizontal ou vertical, artisanal ou industriel. Nos tapis de haute qualité offrent une surface de travail optimale, garantissant une adhérence et une texture parfaites pour obtenir des résultats de façonnage exceptionnels. Faites confiance à notre gamme polyvalente pour améliorer votre processus de façonnage, quel que soit votre secteur d''activité.', 'mp.jpg'),
  ('Tapis de laminoir', 'Découvrez notre gamme de tapis de laminoir et autres transport. Que vous recherchiez un tapis en tissu ou plastifié, lisse ou à relief, de couleur blanche, bleu ou autres, pour accepter des découpes ou non, notre gamme aura le produit pour répondre à vos besoins', 'bdeLam.jpg');

INSERT INTO "product" ("reference", "name", "designation", "description", "image_link", "brand", "price", "unit", "weight", "delivery_time", "stock", "range_id")
VALUES
  ('MP_1120_X_795', 'manchon de façonneuse', 'MANCHON PAIN BERTRAND EURO 2000 AV 1120 x 795', 'Manchon à pain laine épaisseur 6mm 1120 x 795 mm (côte intérieur) avant pour façonneuse Bertrand EURO 2000', 'mp.jpg', 'BERTRAND', 143.35, 1, 2.4,'0 jours', true, 3),
  ('MP_1290_X_795', 'manchon de façonneuse', 'MANCHON PAIN BERTRAND EURO 2000 AR 1290 x 795', 'Manchon à pain laine épaisseur 6mm 1290 x 795 mm (côte intérieur) arrière pour façonneuse Bertrand EURO 2000', 'mp.jpg', 'BERTRAND', 165.11, 1, 2.5,'0 jours', true, 3),
  ('TL_620X395', 'feutre sous tapis lourd de façonneuse', 'Bavette BERTRAND EURO 2000 Largeur 620 x hauteur finie 385 mm', 'Feutre sous tapis lourd épaisseur 3mm pour BERTRAND EURO 2000 Largeur 620 x hauteur finie 385 mm', 'tl.jpg', 'BERTRAND', 13.93, 1, 0.3,'0 jours', true, 3),
  ('TR_800X660', 'tapis de réception de façonneuse', 'Tapis réception BERTRAND EURO 2000 Dim. 800 x 660 mm', 'Tapis réception BERTRAND EURO 2000 Dimenson 800 x 660 mm épaisseur 3mm sans les pressions', 'tr.jpg', 'BERTRAND', 22.60, 1, 0.6,'0 jours', true, 3),
  ('MP_1115_X_790_C2', 'manchon de façonneuse', 'MANCHON PAIN BERTRAND ALLIANCE/M3R AV 1120 x 787', 'Manchon à pain en feutre laine épaisseur 6mm 1120 x 787 mm (côte intérieur) avant pour façonneuse BERTRAND ALLIANCE/M3R', 'mp.jpg', 'BERTRAND', 141.91, 1, 2.4,'0 jours', true, 3),
  ('MP_1280_X_790', 'manchon de façonneuse', 'MANCHON PAIN BERTRAND ALLIANCE/M3R AR 1290 x 787', 'Manchon à pain en feutre laine épaisseur 6mm 1290 x 787 mm (côte intérieur) arrière pour façonneuse BERTRAND ALLIANCE/M3R', 'mp.jpg', 'BERTRAND', 163.45, 1, 2.4,'0 jours', true, 3),
  ('TL_620X395', 'feutre sous tapis lourd de façonneuse', 'Bavette BERTRAND ALLIANCE/M3R Largeur 620 x hauteur finie 385 mm', 'Feutre sous tapis lourd épaisseur 3mm pour BERTRAND EURO 2000 Largeur 620 x hauteur finie 385 mm', 'tl.jpg', 'BERTRAND', 13.93, 1, 0.3,'0 jours', true, 3),
  ('TR_800X660', 'tapis de réception de façonneuse', 'Tapis réception BERTRAND ALLIANCE/M3R Dim. 800 x 660 mm', 'Tapis réception BERTRAND EURO 2000 Dimenson 800 x 660 mm épaisseur 3mm sans les pressions', 'tr.jpg', 'BERTRAND', 22.60, 1, 0.6,'0 jours', true, 3),
  ('MP_1050_X_790_C2', 'manchon de façonneuse', 'MANCHON PAIN BERTRAND EUROMAP AV ARFELT 2500C LD 1050 x 790', 'Manchon à pain en feutre laine épaisseur 6mm 1050 x 790 mm (côte intérieur) avant pour façonneuse BERTRAND EUROMAP', 'mp.jpg', 'BERTRAND', 133.55, 1, 2.2,'0 jours', true, 3),
  ('MP_1160_X_785_C2', 'manchon de façonneuse', 'MANCHON PAIN BERTRAND EUROMAP AR 1160 x 785', 'Manchon à pain en feutre laine épaisseur 6mm 1160 x 785 mm (côte intérieur) arrière pour façonneuse BERTRAND EUROMAP', 'mp.jpg', 'BERTRAND', 146.61, 1, 2.5,'0 jours', true, 3),
  ('TL_580X315', 'feutre sous tapis lourd de façonneuse', 'Bavette BERTRAND EUROMAP Largeur 580 x hauteur finie 315 mm', 'Feutre sous tapis lourd épaisseur 3mm pour BERTRAND EUROMAP Largeur 580 x hauteur finie 315 mm', 'tl.jpg', 'BERTRAND', 11.60, 1, 0.2,'0 jours', true, 3),
  ('TR_800X660', 'tapis de réception de façonneuse', 'Tapis réception BERTRAND EUROMAP Dim. 800 x 660 mm', 'Tapis réception BERTRAND EUROMAP Dimenson 800 x 660 mm épaisseur 3mm sans les pressions', 'tr.jpg', 'BERTRAND', 22.60, 1, 0.6,'0 jours', true, 3),
  ('MP_1310_X_795', 'manchon de façonneuse', 'MANCHON PAIN BERTRAND NOVA/SUPRA 1310 x 795', 'Manchon à pain en feutre laine épaisseur 6mm 1310 x 795 mm (côte intérieur) inférieur/supérieur pour façonneuse BERTRAND NOVA/SUPRA', 'mp.jpg', 'BERTRAND', 167.67, 1, 2.5,'0 jours', true, 3),
  ('TLC_780X650', 'feutre sous tapis lourd de façonneuse', 'Tapis flottant BERTRAND NOVA en ARCOT EC100 largeur 780 hauteur finie 650', 'Tapis flottant en bande coton et trame en PU épaisseur 1.6mm pour BERTRAND NOVA avec ourlet Largeur 780 x hauteur finie 650mm', 'tl.jpg', 'BERTRAND', 54.56, 1, 1,'0 jours', true, 3),
  ('TL_780X650', 'feutre sous tapis lourd de façonneuse', 'Tapis flottant BERTRAND NOVA en FEUTRE FG960 largeur 780 hauteur finie 650', 'Tapis flottant en feutre laine épaisseur 3mm pour BERTRAND NOVA avec ourlet Largeur 780 x hauteur finie 650mm', 'tl.jpg', 'BERTRAND', 28.20, 1, 1,'1 jour', false, 3),
  ('MC_460X570', 'manchon de façonneuse', 'MANCHON BERTRAND NOVA ARFELT 1400 C LD 465 x 570', 'manchon de transport pour façonneuse BERTRAND NOVA en FEUTRE ARFELT 1400C Dimensions 465 x 570mm épaisseur 3mm', 'mp.jpg', 'BERTRAND', 55.20, 1, 0.4, '3 semaines', false, 3),
  ('TRS_790x410_4s', 'Feutre sur tôle de réception de façonneuse', 'Tapis de réception NOVA LD 365 x largeur 790 + 4 sangle élastiques', 'Tapis de réception en feutre synthétique ARSYNTA 550 NOVA LD 365 x largeur 790 + 4 sangle élastiques', 'tr4s.jpg', 'BERTRAND', 30.00, 1, 0.2,'3 à 5 jours', false, 3),
  ('TR_790x640_4s', 'Feutre sur tôle de réception de façonneuse', 'Tapis réception NOVA FG 960 lg 790 x Ht 640 4 sangle élastique L95 ', 'Tapis réception en feutre laine FG 960 NOVA lg 790 x Ht 640 4 sangle élastique L95 ', 'tr4s.jpg', 'BERTRAND', 37.20, 1, 0.6,'3 à 5 jours', false, 3),


  ('TE_70X30_3S_B', 'Toile enfourneur', 'Toile Enfour. BONGARD CS8T (3050 x 705) 3 sangles + boucles + barres', 'Toile enfourneur en Coton 500g/m2 à 3 sangles avec barres inox serties pour four Bongard réf: CS8T', 'TE_Bong.jpg', 'Bongard', 58.07, 1, 2.5,'0 jours', true, 1);
  
INSERT INTO "quotation_has_product" ("quotation_id", "product_id", "quantity")
VALUES
  (1, 1, 2),
  (2, 1, 2),
  (2, 2, 2),
  (2, 3, 2),
  (2, 4, 2);
  
COMMIT;