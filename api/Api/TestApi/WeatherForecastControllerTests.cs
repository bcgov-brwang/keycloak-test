using Api.Controllers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;


namespace TestApi
{
    public class WeatherForecastControllerTests
    {

        [Fact]
        public void GetTitle_Should_Return_String()
        {
            // Arrange
            var controller = new WeatherForecastController(null);

            // Act
            var result = controller.GetTitle();

            // Assert
            Assert.IsType<ActionResult<string>>(result);
            
        }
    }
}
