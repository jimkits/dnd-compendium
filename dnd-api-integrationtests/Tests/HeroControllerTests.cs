using System.Net;
using Microsoft.AspNetCore.Mvc.Testing;
using System.Text.Json;
using FluentAssertions;
using FluentAssertions.Execution;
using DnD.API.Data;

namespace DnD.API.IntegrationTests.Tests;

// Currently used to run tests in collection sequentially
// TODO: Create classes to handle fixtures 
[Collection("Authorized Tests")]
public class HeroControllerTests : BaseTestClass
{
    public HeroControllerTests(WebApplicationFactory<Program> factory) : base(factory) { }

    [Fact]
    public async Task GetHeroes_ReturnsAllHeroes()
    {
        // Act
        var response = await _clientWithToken.GetAsync("/api/hero/all");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);

        var contentString = await response.Content.ReadAsStringAsync();

        var content = JsonSerializer.Deserialize<List<HeroData>>(contentString, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

        content.Should().NotBeNullOrEmpty();

        // Get all errors at one, not 1 at a time.
        using (new AssertionScope())
        {
            content.Select(x => x.Name).Should().NotBeNullOrEmpty();
            content.Select(x => x.Description).Should().NotBeNullOrEmpty();
            content.Select(x => x.Image).Should().NotBeNullOrEmpty();
        }
    }

    [Fact]
    public async Task GetHero_ValidHero_ReturnsCorrectHero()
    {
        // Act
        var response = await _clientWithToken.GetAsync("/api/hero?hero=cleric");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);

        var contentString = await response.Content.ReadAsStringAsync();

        var content = JsonSerializer.Deserialize<HeroData>(contentString, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

        using (new AssertionScope())
        {
            content!.Name.Should().BeEquivalentTo("cleric");
            content.Description.Should().NotBeNullOrEmpty();
        }
    }

    [Fact]
    public async Task GetHero_Null_ReturnsNotFound()
    {
        // Act
        var response = await _clientWithToken.GetAsync("/api/hero");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.NotFound);

        var content = await response.Content.ReadAsStringAsync();

        content.Should().Contain("No hero was requested");
    }

    [Fact]
    public async Task GetHero_HeroThatDoesNotExist_ReturnsBadRequest()
    {
        // Act
        var response = await _clientWithToken.GetAsync("/api/hero?hero=void");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

        var content = await response.Content.ReadAsStringAsync();

        content.Should().ContainEquivalentOf("The value 'void' is not valid");
    }
}
