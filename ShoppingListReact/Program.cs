using Microsoft.EntityFrameworkCore;
using ShoppingListReact.Models;
using System;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
const string corsPolicy = "any origin";
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: corsPolicy, policy =>
        policy.WithOrigins("http://localhost:3000"));
});
builder.Services.AddDbContext<ShoppingListContext>(opt =>
opt.UseSqlServer(builder.Configuration.GetConnectionString("Database")));

var app = builder.Build();
app.UseCors(corsPolicy);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var db = scope.ServiceProvider.GetRequiredService<ShoppingListContext>();
    db.Database.EnsureDeleted();
    db.Database.EnsureCreated();
}

app.MapGet("/shoppingItems", async ( ShoppingListContext db ) =>
    await db.ShoppingListItems.ToListAsync());

app.UseHttpsRedirection();

app.Run();

