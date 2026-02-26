using System.Text.Json.Serialization;

namespace BTServer.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum Category
    {
        Housing = 1,
        Groceries = 2,
        Savings = 3,
        Fun = 4,
        Other = 5
    }
}
