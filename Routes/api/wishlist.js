const express = require("express");
const router = express.Router();
const WishListItem = require('../../models/WishListItem');

/////////////////////////////////////// get all items from cartItemsSchema to the cart //////////////////////////////////////////
/* after user went to the shopping cart */
router.get('/view/:email', async (req, res) => {

    console.log('Front req Wishlist  ',req.params);
    
      try {
        let wishListItems = await WishListItem.find({addedUserEmail:req.params.email});
        if(!wishListItems)
          res.status(404).json({msg:'No Items Found'})
        else{
          res.status(200).json(wishListItems)
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Sever Error" });
      }
});
    
    
    /////////////////////////////////////////////// add item to the cartItemsSchema //////////////////////////////////////////////////
    /* once user click button add to cart */
router.post('/add', async (req, res) => {
    
    console.log('Add req body : ',req.body);
    
      console.log(req.body)
      try {
        let wishListItem = {
          itemName:req.body.itemName,
          price:req.body.price,
          category:req.body.category,
          itemImage:req.body.itemImage,
          size:req.body.size,
          color:req.body.color,
          brand:req.body.brand,
          stockQuantity:req.body.stockQuantity,
          discount:req.body.discount,
          addedUserFirstName:req.body.addedUserFirstName,
          addedUserLastName:req.body.addedUserLastName,
          addedUserEmail:req.body.addedUserEmail,
          addedDate:req.body.addedDate,
          rating:req.body.rating,
          isApproved:req.body.isApproved,
          quantity:req.body.quantity,
          company:req.body.company,
          isSelectedItem:req.body.isSelectedItem,
          totalPrice:req.body.totalPrice,
          itemId:req.body.itemId
      }
    
      WishListItem.create(wishListItem ,(err)=>{
          if(err){
              return res.status(400).send({ msg: err });
          }else{
              return res.status(201).send(wishListItem);
          }
      })
      } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Sever Error" });
      }
});



/////////////////////////////////////////// remove items from the cartItemsSchema ////////////////////////////////////////////////
/* user can remove item from shopping cart */
router.delete('/remove/:id', async (req, res) => {
  
    console.log('Delete WishList Item : ', req.params);
      try {
        const wishListItemExists = await WishListItem.findOne({ _id: req.params.id });
        if (!wishListItemExists) {
          return res.status(400).json({ msg: "CartItem does not exist" });
        }
       
        res.status(200).json(wishListItemExists);
        await wishListItemExists.remove();
  
      } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" });
      }
   
  });
    

    
module.exports = router;