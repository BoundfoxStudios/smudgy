namespace BoundfoxStudios.Smudgy.Data.Models
{
  public class Player : BaseEntity
  {
    public string Name { get; set; }
    public string SocketId { get; set; } // TODO: not sure, if we want to save this to the database
  }
}
