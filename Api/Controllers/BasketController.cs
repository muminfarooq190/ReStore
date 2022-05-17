using System;
using System.Linq;
using System.Threading.Tasks;
using Api.DTOs;
using Api.Entities;
using API.Controllers;
using API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    public class BasketController : ApiBaseController
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet(Name ="GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket();

            if (basket == null) return NotFound();
            return MapBasketToDto(basket);

        }

      


        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int ProductId, int quantity)
        {
            //create basket
            var basket = await RetrieveBasket();
            if(basket == null) basket = CreateBasket();
            //get products  
            var product = await _context.Products.FindAsync(ProductId);
            if(product == null) return BadRequest(new ProblemDetails{Title= "Product Not Found"});

            //add item
            basket.AddItem(product, quantity);

            var result = await _context.SaveChangesAsync() > 0;
            if(result) return CreatedAtRoute("GetBasket", MapBasketToDto(basket));
            return BadRequest(new ProblemDetails{Title = "Problem saving item to basket"});

            //save changes     
        }

        

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int ProductId, int quantity)
        {
            //get basket
            var basket = await RetrieveBasket();
            // remove item or reduce quantity
            basket.RemoveItem(ProductId, quantity);

            var result = await _context.SaveChangesAsync() > 0;
            if(result) return Ok();
            //save changes
            return BadRequest(new ProblemDetails{Title = "Problem deleting item from basket"});
        }

        private async Task<Basket> RetrieveBasket()
        {
            return await _context.Baskets
                                .Include(i => i.Items)
                                .ThenInclude(p => p.Product)
                                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }
        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions{IsEssential=true, Expires = DateTime.Now.AddDays(30)};
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            var basket = new Basket{BuyerId = buyerId};
            _context.Baskets.Add(basket);
            return basket;
        }

          private BasketDto MapBasketToDto(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.price,
                    PictureUrl = item.Product.pictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Type,
                    Quantity = item.Quantity
                }).ToList()

            };
        }
    }
}