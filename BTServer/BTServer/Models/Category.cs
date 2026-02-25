using System.Text.Json.Serialization;

namespace BTServer.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum Category
    {
        Housing = 0,
        Groceries = 1,
        Savings = 2,
        Fun = 3,
        Other = 4
    }
}
