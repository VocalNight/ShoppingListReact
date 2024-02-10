using Microsoft.EntityFrameworkCore;

namespace ShoppingListReact.Models
{
    public class ShoppingListContext: DbContext
    {
        public ShoppingListContext( DbContextOptions<ShoppingListContext> options ) : base(options) { }

        public DbSet<Item> ShoppingListItems { get; set; }
    }
}
