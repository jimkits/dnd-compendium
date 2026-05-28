using Microsoft.AspNetCore.Mvc.Testing;
using System.Net.Http.Json;
using System.Text.Json;
using FluentAssertions;
using FluentAssertions.Execution;
using System.Net.Http.Headers;

namespace DnD.API.IntegrationTests.Tests;

public class BaseTestClass : IClassFixture<WebApplicationFactory<Program>>, IAsyncLifetime
{
    // Spins up the full API in-process, no need for a running service
    private WebApplicationFactory<Program> _factory;
    // Auth handled once here, inherited by all tests
    public HttpClient _clientWithToken;
    public HttpClient _clientWithoutToken;
    public TestSettings _testSettings;

    public BaseTestClass(WebApplicationFactory<Program> factory)
    {
        _testSettings = TestSettings.Load();

        _factory = factory;

        _clientWithoutToken = CreateClient();
        _clientWithToken = CreateClient();
    }

    public async Task InitializeAsync()
    {
        // Setup
        var loginRequest = new LoginRequest
        {
            Username = "admin",
            Password = "admin"
        };

        // Act
        var response = _clientWithoutToken.PostAsJsonAsync("/api/login", loginRequest);

        var result = response.GetAwaiter().GetResult();

        // Assert
        var contentString = result.Content.ReadAsStringAsync();

        var content = JsonSerializer.Deserialize<LoginResponse>(contentString.Result, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

        content.Should().NotBeNull();
        using (new AssertionScope())
        {
            content.Message.Should().ContainEquivalentOf("Login successful");
            content.Token.Should().NotBeNullOrEmpty();
        }

        _clientWithToken.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", content.Token);
    }

    public async Task DisposeAsync()
    {
    }

    private HttpClient CreateClient()
    {
        HttpClient client;

        if (_testSettings.Selfhosted)
        {
            client = _factory.CreateClient();
        }
        else
        {
            if (string.IsNullOrEmpty(_testSettings.Url))
            {
                throw new Exception("The URL is not set in the testsettings file");
            }
            client = new HttpClient()
            {
                BaseAddress = new Uri(_testSettings.Url)
            };
        }

        return client;
    }
}