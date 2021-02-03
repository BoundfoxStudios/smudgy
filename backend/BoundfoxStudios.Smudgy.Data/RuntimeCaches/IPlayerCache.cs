using System;
using BoundfoxStudios.Smudgy.Data.Models.Runtime;
using Microsoft.Extensions.Caching.Memory;

namespace BoundfoxStudios.Smudgy.Data.RuntimeCaches
{
  public interface IPlayerCache : IRuntimeCache<Player, Guid>
  {
    Player GetByConnectionId(string connectionId);
  }

  public class PlayerCache : DefaultRuntimeCache<Player, Guid>, IPlayerCache
  {
    public PlayerCache(IMemoryCache memoryCache) : base(memoryCache) { }

    public override void Set(Guid id, Player model)
    {
      base.Set(id, model);
      MemoryCache.Set(model.SocketId, model);
    }

    public Player GetByConnectionId(string connectionId)
    {
      return MemoryCache.Get(connectionId) as Player;
    }
  }
}
