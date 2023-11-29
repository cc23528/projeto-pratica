package javaapplication1;

public class Product {
    
    private int id;
    private String name;
    private String type;
    private int quantity;
    private float price;
    private byte[] picture;
    
    public Product(int pid, String pname, String ptype, int pquantity, float pprice, byte[] pimg)
    {
        this.id = pid;
        this.name = pname;
        this.type = ptype;
        this.quantity = pquantity;
        this.price = pprice;
        this.picture = pimg;
    }
    
    public int getId()
    {
        return id;
    }
    
    public String getName()
    {
        return name;
    }
    
    public String getType()
    {
        return type;
    }
    
    public int getQuantity()
    {
        return quantity;
    }
    
    public float getPrice()
    {
        return price;
    }
    
    public byte[] getImage()
    {
        return picture;
    }
}
