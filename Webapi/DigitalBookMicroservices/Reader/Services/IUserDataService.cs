using Reader.Models;
using Reader.Models.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Reader.Services
{
    public interface IUserDataService
    {
        Task<dynamic> GetAuthorByReaderSearch(SearchDataModel searchDataModel);
    }
}
