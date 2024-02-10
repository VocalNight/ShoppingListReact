using Microsoft.EntityFrameworkCore;
using ShoppingListReact.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ShoppingListContext>(opt =>
opt.UseSqlServer(builder.Configuration.GetConnectionString("Database")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/shoppingItems", async ( ShoppingListContext db ) =>
    await db.ShoppingListItems.ToListAsync());

app.UseHttpsRedirection();

app.Run();

