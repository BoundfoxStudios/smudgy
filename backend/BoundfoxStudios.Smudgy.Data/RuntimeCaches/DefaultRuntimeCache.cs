using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Memory;

namespace BoundfoxStudios.Smudgy.Data.RuntimeCaches
{
  public class DefaultRuntimeCache<TModel, TId> : IRuntimeCache<TModel, TId>
  {
    protected readonly IMemoryCache MemoryCache;

    protected DefaultRuntimeCache(IMemoryCache memoryCache)
    {
      MemoryCache = memoryCache;
    }

    public virtual TModel Get(TId id)
    {
      return (TModel) MemoryCache.Get(id);
    }

    public virtual async Task<TModel> GetOrCreateAsync(TId id, Func<Task<TModel>> factory)
    {
      return await MemoryCache.GetOrCreateAsync(id, _ => factory());
    }

    public virtual void Set(TId id, TModel model)
    {
      MemoryCache.Set(id, model);
    }

    public virtual void Remove(TId id)
    {
      MemoryCache.Remove(id);
    }
  }
}
