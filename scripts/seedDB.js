const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;
const ObjectId = require('mongodb').ObjectID;


// This file empties the Products collection and inserts the products below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://heroku_f920lkcw:g11pqp87ojterlrmrdlhs6ki6l@ds117729.mlab.com:17729/heroku_f920lkcw",
  {
    useMongoClient: true
  }
);

const placements = [
  { section: "Men's", aisle: "A1", rack: "R1", name: "Men's Section Aisle A1 Rack R1", id: "MenA1R1", description: "This section has a variety of menswear", photoURL: "http://media.tumblr.com/tumblr_lzp8sjvHJS1qb7llu.jpg" },
  { section: "Men's", aisle: "A2", rack: "R2", name: "Men's Section Aisle A2 Rack R2", id: "MenA2R2", description: "This section has a variety of menswear", photoURL: "http://media.tumblr.com/tumblr_lzp8sjvHJS1qb7llu.jpg" },
  { section: "Men's", aisle: "A3", rack: "R3", name: "Men's Section Aisle A3 Rack R3", id: "MenA3R3", description: "This section has a variety of menswear", photoURL: "http://media.tumblr.com/tumblr_lzp8sjvHJS1qb7llu.jpg" },
  { section: "Men's", aisle: "A4", rack: "R4", name: "Men's Section Aisle A4 Rack R4", id: "MenA4R4", description: "This section has a variety of menswear", photoURL: "http://media.tumblr.com/tumblr_lzp8sjvHJS1qb7llu.jpg" },
  { section: "Men's", aisle: "A5", rack: "R5", name: "Men's Section Aisle A5 Rack R5", id: "MenA5R5", description: "This section has a variety of menswear", photoURL: "http://media.tumblr.com/tumblr_lzp8sjvHJS1qb7llu.jpg" },
  { section: "Men's", aisle: "A6", rack: "R6", name: "Men's Section Aisle A6 Rack R6", id: "MenA6R6", description: "This section has a variety of menswear", photoURL: "https://ars.els-cdn.com/content/image/1-s2.0-S002243590400003X-gr3.jpg" },
  { section: "Men's", aisle: "A7", rack: "R7", name: "Men's Section Aisle A7 Rack R7", id: "MenA7R7", description: "This section has a variety of menswear", photoURL: "https://ars.els-cdn.com/content/image/1-s2.0-S002243590400003X-gr3.jpg" },
  { section: "Men's", aisle: "A8", rack: "R8", name: "Men's Section Aisle A8 Rack R8", id: "MenA8R8", description: "This section has a variety of menswear", photoURL: "https://ars.els-cdn.com/content/image/1-s2.0-S002243590400003X-gr3.jpg" },
  { section: "Men's", aisle: "A9", rack: "R9", name: "Men's Section Aisle A9 Rack R9", id: "MenA9R9", description: "This section has a variety of menswear", photoURL: "https://ars.els-cdn.com/content/image/1-s2.0-S002243590400003X-gr3.jpg" },
  { section: "Men's", aisle: "A10", rack: "R10", name: "Men's Section Aisle A10 Rack R10", id: "MenA10R10", description: "This section has a variety of menswear", photoURL: "http://media.tumblr.com/tumblr_lzp8sjvHJS1qb7llu.jpg" },
  { section: "Men's", aisle: "A11", rack: "R11", name: "Men's Section Aisle A11 Rack R11", id: "MenA11R11", description: "This section has a variety of menswear", photoURL: "http://media.tumblr.com/tumblr_lzp8sjvHJS1qb7llu.jpg" },
  { section: "Men's", aisle: "A12", rack: "R12", name: "Men's Section Aisle A12 Rack R12", id: "MenA12R12", description: "This section has a variety of womenswear", photoURL: "http://media.tumblr.com/tumblr_lzp8sjvHJS1qb7llu.jpg" },
  { section: "Women's", aisle: "A13", rack: "R13", name: "Women's Section Aisle A13 Rack R13", id: "WomA13R13", description: "This section has a variety of womenswear", photoURL: "http://media.tumblr.com/tumblr_lzp8sjvHJS1qb7llu.jpg" },
  { section: "Women's", aisle: "A14", rack: "R14", name: "Women's Section Aisle A14 Rack R14", id: "WomA14R14", description: "This section has a variety of womenswear", photoURL: "https://ars.els-cdn.com/content/image/1-s2.0-S002243590400003X-gr3.jpg" },
  { section: "Women's", aisle: "A15", rack: "R15", name: "Women's Section Aisle A15 Rack R15", id: "WomA15R15", description: "This section has a variety of womenswear", photoURL: "https://ars.els-cdn.com/content/image/1-s2.0-S002243590400003X-gr3.jpg" },
  { section: "Women's", aisle: "A16", rack: "R16", name: "Women's Section Aisle A16 Rack R16", id: "WomA16R16", description: "This section has a variety of womenswear", photoURL: "https://ars.els-cdn.com/content/image/1-s2.0-S002243590400003X-gr3.jpg" },
  { section: "Women's", aisle: "A17", rack: "R17", name: "Women's Section Aisle A17 Rack R17", id: "WomA17R17", description: "This section has a variety of womenswear", photoURL: "http://media.tumblr.com/tumblr_lzp8sjvHJS1qb7llu.jpg" },
  { section: "Women's", aisle: "A18", rack: "R18", name: "Women's Section Aisle A18 Rack R18", id: "WomA18R18", description: "This section has a variety of womenswear", photoURL: "http://media.tumblr.com/tumblr_lzp8sjvHJS1qb7llu.jpg" },
  { section: "Women's", aisle: "A19", rack: "R19", name: "Women's Section Aisle A19 Rack R19", id: "WomA19R19", description: "This section has a variety of womenswear", photoURL: "http://media.tumblr.com/tumblr_lzp8sjvHJS1qb7llu.jpg" },
  { section: "Women's", aisle: "A20", rack: "R20", name: "Women's Section Aisle A20 Rack R20", id: "WomA20R20", description: "This section has a variety of womenswear", photoURL: "http://media.tumblr.com/tumblr_lzp8sjvHJS1qb7llu.jpg" },
  { section: "Kids", aisle: "A21", rack: "R21", name: "Kids Section Aisle A21 Rack R21", id: "KidA21R21", description: "This section has a variety of kids wear", photoURL: "https://ars.els-cdn.com/content/image/1-s2.0-S002243590400003X-gr3.jpg" },
  { section: "Kids", aisle: "A22", rack: "R22", name: "Kids Section Aisle A22 Rack R22", id: "KidA22R22", description: "This section has a variety of kids wear", photoURL: "https://ars.els-cdn.com/content/image/1-s2.0-S002243590400003X-gr3.jpg" },
  { section: "Kids", aisle: "A23", rack: "R23", name: "Kids Section Aisle A23 Rack R23", id: "KidA23R23", description: "This section has a variety of kids wear", photoURL: "https://ars.els-cdn.com/content/image/1-s2.0-S002243590400003X-gr3.jpg" },
  { section: "Kids", aisle: "A24", rack: "R24", name: "Kids Section Aisle A24 Rack R24", id: "KidA24R24", description: "This section has a variety of kids wear", photoURL: "http://media.tumblr.com/tumblr_lzp8sjvHJS1qb7llu.jpg" },
  { section: "Kids", aisle: "A25", rack: "R25", name: "Kids Section Aisle A25 Rack R25", id: "KidA25R25", description: "This section has a variety of kids wear", photoURL: "http://media.tumblr.com/tumblr_lzp8sjvHJS1qb7llu.jpg" },
  { section: "Kids", aisle: "A26", rack: "R26", name: "Kids Section Aisle A26 Rack R26", id: "KidA26R26", description: "This section has a variety of kids wear", photoURL: "http://media.tumblr.com/tumblr_lzp8sjvHJS1qb7llu.jpg" }
];

const products = [
  { price: "10", keywords: ["Men's", "Tshirt3", "color3"], name: "Men's Tshirt1 color1", id: "178394758736", photoURL: "https://slimages.macysassets.com/is/image/MCY/products/8/optimized/9348098_fpx.tif?op_sharpen=1&wid=400&hei=489&fit=fit,1&$filterlrg$" },
  { price: "12", keywords: ["Men's", "Tshirt3", "color3"], name: "Men's Tshirt2 color2", id: "178394758836", photoURL: "https://slimages.macysassets.com/is/image/MCY/products/1/optimized/9418191_fpx.tif?wid=312&fit=fit,1&$filterxlrg$" },
  { price: "14", keywords: ["Men's", "Tshirt3", "color3"], name: "Men's Tshirt3 color3", id: "178394758936", photoURL: "https://slimages.macysassets.com/is/image/MCY/products/2/optimized/8591742_fpx.tif?op_sharpen=1&wid=400&hei=489&fit=fit,1&$filterlrg$" },
  { price: "16", keywords: ["Men's", "Tshirt3", "color3"], name: "Men's Tshirt4 color4", id: "178394759036", photoURL: "https://slimages.macysassets.com/is/image/MCY/products/6/optimized/8265436_fpx.tif??op_sharpen=1&fit=fit,1&$filterxlrg$&wid=1200&hei=1467" },
  { price: "18", keywords: ["Men's", "Tshirt3", "color3"], name: "Men's Tshirt5 color5", id: "178394759136", photoURL: "https://slimages.macysassets.com/is/image/MCY/products/3/optimized/8265443_fpx.tif??op_sharpen=1&fit=fit,1&$filterxlrg$&wid=1200&hei=1467" },
  { price: "20", keywords: ["Men's", "Tshirt3", "color3"], name: "Men's Tshirt6 color6", id: "178394759236", photoURL: "https://slimages.macysassets.com/is/image/MCY/products/6/optimized/8265446_fpx.tif??op_sharpen=1&fit=fit,1&$filterxlrg$&wid=1200&hei=1467" },
  { price: "22", keywords: ["Men's", "Tshirt3", "color3"], name: "Men's Tshirt7 color7", id: "178394759336", photoURL: "https://slimages.macysassets.com/is/image/MCY/products/9/optimized/8265449_fpx.tif??op_sharpen=1&fit=fit,1&$filterxlrg$&wid=1200&hei=1467" },
  { price: "24", keywords: ["Men's", "Tshirt3", "color3"], name: "Men's Tshirt8 color8", id: "178394759436", photoURL: "https://slimages.macysassets.com/is/image/MCY/products/2/optimized/8265452_fpx.tif??op_sharpen=1&fit=fit,1&$filterxlrg$&wid=1200&hei=1467" },
  { price: "26", keywords: ["Men's", "Tshirt1", "color1"], name: "Men's Tshirt9 color9", id: "178394759536", photoURL: "https://slimages.macysassets.com/is/image/MCY/products/9/optimized/8265379_fpx.tif?op_sharpen=1&wid=400&hei=489&fit=fit,1&$filterlrg$" },
  { price: "28", keywords: ["Men's", "Tshirt1", "color1"], name: "Men's Tshirt10 color10", id: "178394759636", photoURL: "https://slimages.macysassets.com/is/image/MCY/products/1/optimized/8963561_fpx.tif?op_sharpen=1&wid=400&hei=489&fit=fit,1&$filterlrg$" },
  { price: "30", keywords: ["Men's", "Tshirt5", "color5"], name: "Men's Tshirt11 color11", id: "178394759736", photoURL: "https://slimages.macysassets.com/is/image/MCY/products/0/optimized/9074590_fpx.tif??op_sharpen=1&fit=fit,1&$filterxlrg$&wid=1200&hei=1467" },
  { price: "32", keywords: ["Men's", "Tshirt7", "color7"], name: "Men's Tshirt12 color12", id: "178394759836", photoURL: "https://slimages.macysassets.com/is/image/MCY/products/3/optimized/8963533_fpx.tif??op_sharpen=1&fit=fit,1&$filterxlrg$&wid=1200&hei=1467" },
  { price: "34", keywords: ["Women's", "Top7", "color7"], name: "Women's Top13 color13", id: "178394759936", photoURL: "https://slimages.macysassets.com/is/image/MCY/products/6/optimized/9455066_fpx.tif?bgc=255,255,255&wid=224&qlt=90,0,0&layer=comp&op_sharpen=0&resMode=bicub&op_usm=0.7,1.0,0.5,0&fmt=jpeg" },
  { price: "36", keywords: ["Women's", "Top7", "color7"], name: "Women's Top14 color14", id: "178394760036", photoURL: "https://slimages.macysassets.com/is/image/MCY/products/3/optimized/9460783_fpx.tif?bgc=255,255,255&wid=224&qlt=90,0,0&layer=comp&op_sharpen=0&resMode=bicub&op_usm=0.7,1.0,0.5,0&fmt=jpeg" },
  { price: "38", keywords: ["Women's", "Top2", "color2"], name: "Women's Top15 color15", id: "178394760136", photoURL: "https://slimages.macysassets.com/is/image/MCY/products/6/optimized/9406366_fpx.tif?bgc=255,255,255&wid=224&qlt=90,0,0&layer=comp&op_sharpen=0&resMode=bicub&op_usm=0.7,1.0,0.5,0&fmt=jpeg" },
  { price: "40", keywords: ["Women's", "Top1", "color1"], name: "Women's Top16 color16", id: "178394760236", photoURL: "https://slimages.macysassets.com/is/image/MCY/products/1/optimized/9551971_fpx.tif?bgc=255,255,255&wid=224&qlt=90,0,0&layer=comp&op_sharpen=0&resMode=bicub&op_usm=0.7,1.0,0.5,0&fmt=jpeg" },
  { price: "42", keywords: ["Women's", "Top1", "color1"], name: "Women's Top17 color17", id: "178394760336", photoURL: "https://slimages.macysassets.com/is/image/MCY/products/2/optimized/9269412_fpx.tif?bgc=255,255,255&wid=224&qlt=90,0,0&layer=comp&op_sharpen=0&resMode=bicub&op_usm=0.7,1.0,0.5,0&fmt=jpeg" },
  { price: "44", keywords: ["Women's", "Top1", "color1"], name: "Women's Top18 color18", id: "178394760436", photoURL: "https://slimages.macysassets.com/is/image/MCY/products/3/optimized/9197943_fpx.tif?bgc=255,255,255&wid=705&qlt=90,0,0&layer=comp&op_sharpen=0&resMode=bicub&op_usm=0.7,1.0,0.5,0&fmt=jpeg" },
  { price: "46", keywords: ["Women's", "Top2", "color2"], name: "Women's Top19 color19", id: "178394760536", photoURL: "https://slimages.macysassets.com/is/image/MCY/products/0/optimized/8053300_fpx.tif?bgc=255,255,255&wid=224&qlt=90,0,0&layer=comp&op_sharpen=0&resMode=bicub&op_usm=0.7,1.0,0.5,0&fmt=jpeg" },
  { price: "48", keywords: ["Women's", "Top2", "color2"], name: "Women's Top20 color20", id: "178394760636", photoURL: "https://slimages.macysassets.com/is/image/MCY/products/6/optimized/9278466_fpx.tif?bgc=255,255,255&wid=224&qlt=90,0,0&layer=comp&op_sharpen=0&resMode=bicub&op_usm=0.7,1.0,0.5,0&fmt=jpeg" },
  { price: "50", keywords: ["Kid's", "Sweater2", "color2"], name: "Kids Sweater21 color21", id: "178394760736", photoURL: "https://slimages.macysassets.com/is/image/MCY/products/2/optimized/8700782_fpx.tif?bgc=255,255,255&wid=224&qlt=90,0,0&layer=comp&op_sharpen=0&resMode=bicub&op_usm=0.7,1.0,0.5,0&fmt=jpeg" },
  { price: "52", keywords: ["Kid's", "Sweater2", "color2"], name: "Kids Sweater22 color22", id: "178394760836", photoURL: "https://slimages.macysassets.com/is/image/MCY/products/8/optimized/8873818_fpx.tif?bgc=255,255,255&wid=224&qlt=90,0,0&layer=comp&op_sharpen=0&resMode=bicub&op_usm=0.7,1.0,0.5,0&fmt=jpeg" },
  { price: "54", keywords: ["Kid's", "Sweater9", "color9"], name: "Kids Sweater23 color23", id: "178394760936", photoURL: "https://slimages.macysassets.com/is/image/MCY/products/8/optimized/8901068_fpx.tif?bgc=255,255,255&wid=224&qlt=90,0,0&layer=comp&op_sharpen=0&resMode=bicub&op_usm=0.7,1.0,0.5,0&fmt=jpeg" },
  { price: "56", keywords: ["Kid's", "Sweater9", "color9"], name: "Kids Sweater24 color24", id: "178394761036", photoURL: "https://slimages.macysassets.com/is/image/MCY/products/8/optimized/8901068_fpx.tif?bgc=255,255,255&wid=224&qlt=90,0,0&layer=comp&op_sharpen=0&resMode=bicub&op_usm=0.7,1.0,0.5,0&fmt=jpeg" },
  { price: "58", keywords: ["Kid's", "Sweater9", "color9"], name: "Kids Sweater25 color25", id: "178394761136", photoURL: "https://slimages.macysassets.com/is/image/MCY/products/1/optimized/9371011_fpx.tif?bgc=255,255,255&wid=224&qlt=90,0,0&layer=comp&op_sharpen=0&resMode=bicub&op_usm=0.7,1.0,0.5,0&fmt=jpeg" },
  { price: "60", keywords: ["Kid's", "Sweater1", "color1"], name: "Kids Sweater26 color26", id: "178394761236", photoURL: "https://slimages.macysassets.com/is/image/MCY/products/7/optimized/8970137_fpx.tif?bgc=255,255,255&wid=224&qlt=90,0,0&layer=comp&op_sharpen=0&resMode=bicub&op_usm=0.7,1.0,0.5,0&fmt=jpeg" }

];

const storeId = "5adadb2f49350d0014f777f4";

db.Placement
  .remove({})
  .then(() => db.Placement.collection.insertMany(placements))
  .then(data => {
    console.log(data.insertedIds.length + "placements records inserted!");
    const placementIds = data.insertedIds;
    products.forEach(function (p, index) {
      p.placements = [];
      p.store = ObjectId(storeId);
      p.placements.push(placementIds[Math.floor(Math.random() * placementIds.length)]);
      if (index % 2 === 0) {
        p.placements.push(placementIds[Math.floor(Math.random() * placementIds.length)]);
      }
    });

    db.Product
      .remove({})
      .then(() => db.Product.collection.insertMany(products))
      .then(pdata => {
        console.log(pdata.insertedIds.length + "products records inserted!");
        const productIds = pdata.insertedIds;
        db.Store.findOneAndUpdate(
          { _id: ObjectId(storeId) }, { products: productIds, placements: placementIds }
        ).then(data => {
          process.exit(0);
        })
      })
      .catch(err => {
        console.error(err);
        process.exit(1);
      });
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
