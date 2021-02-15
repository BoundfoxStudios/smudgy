using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BoundfoxStudios.Smudgy.Data.Models.Runtime;
using Microsoft.Extensions.Caching.Memory;

namespace BoundfoxStudios.Smudgy.Data.RuntimeCaches
{
  public interface ISessionCache : IRuntimeCache<Session, Guid>
  {
    Session GetByHostPlayerId(Guid playerId);
  }

  public class SessionCache : DefaultRuntimeCache<Session, Guid>, ISessionCache
  {
    public SessionCache(IMemoryCache memoryCache) : base(memoryCache) { }

    public override void Set(Guid id, Session model)
    {
      base.Set(id, model);

      AddPlayerToSession(model);
    }

    private void AddPlayerToSession(Session model)
    {
      MemoryCache.Set(CreatePlayerToSessionCacheKey(model.HostPlayerId), model.Id);
    }

    public override async Task<Session> GetOrCreateAsync(Guid id, Func<Task<Session>> factory)
    {
      return await base.GetOrCreateAsync(id, async () =>
      {
        var result = await factory();

        AddPlayerToSession(result);

        return result;
      });
    }

    public override void Remove(Guid id)
    {
      var session = Get(id);

      base.Remove(id);

      MemoryCache.Remove(session.HostPlayerId);
    }

    public Session GetByHostPlayerId(Guid playerId)
    {
      if (MemoryCache.Get(CreatePlayerToSessionCacheKey(playerId)) is Guid sessionId)
      {
        var session = Get(sessionId);

        return session;
      }

      return null;
    }

    private string CreatePlayerToSessionCacheKey(Guid playerId) => $"playerToSession_{playerId};";
  }
}
