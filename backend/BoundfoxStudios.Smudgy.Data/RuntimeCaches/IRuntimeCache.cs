using System;
using System.Threading.Tasks;

namespace BoundfoxStudios.Smudgy.Data.RuntimeCaches
{
  public interface IRuntimeCache<TModel, in TId>
  {
    TModel Get(TId id);
    Task<TModel> GetOrCreateAsync(TId id, Func<Task<TModel>> factory);
    void Set(TId id, TModel model);
    void Remove(TId id);
  }
}
