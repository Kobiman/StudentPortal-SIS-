using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Models
{
    public interface IResult
    {
        bool IsSucessful { get; }
        string Message { get; }
    }

    public class Result<T> : IResult
    {
        public bool IsSucessful { get; set; }
        public T Value { get; set; }
        public string Message { get; set; }

        public Result()
        {
        }
        public Result(bool isSuccessful, T value, string message)
        {
            IsSucessful = isSuccessful;
            Message = message;
            Value = value;
        }
    }

    public class Result : IResult
    {
        public bool IsSucessful { get; private set; }
        public string Message { get; private set; }

        public Result(bool isSuccessful, string message)
        {
            IsSucessful = isSuccessful;
            Message = message;
        }
    }
}
