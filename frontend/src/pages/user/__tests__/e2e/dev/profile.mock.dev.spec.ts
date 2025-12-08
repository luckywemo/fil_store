import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

// Test suite for the Account Profile page
test.describe('Account Profile Page Tests (Mock)', () => {
  // Configure screenshot directories with new structure
  const baseScreenshotDir = path.join(process.cwd(), 'test_screenshots');
  const newScreenshotDir = path.join(baseScreenshotDir, 'development', 'user', 'profile', 'mock');
  const legacyScreenshotDir = path.join(baseScreenshotDir, 'user');

  // Define device sizes for responsive testing
  const deviceSizes = {
    mobile: { width: 375, height: 667 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1280, height: 800 }
  };

  // Create directories if they don't exist
  const createDirIfNotExists = (dirPath: string): void => {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  };

  test.beforeAll(() => {
    // Create screenshot directories
    createDirIfNotExists(newScreenshotDir);
    createDirIfNotExists(legacyScreenshotDir);
  });

  test.beforeEach(async ({ page }) => {
    // Mock the API call to get user data
    await page.route('/api/user/test-user-123', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 'test-user-123',
          username: 'testuser',
          email: 'test@example.com',
          name: 'Test User',
        }),
      });
    });

    // Navigate to the profile page
    await page.goto('/account/profile');
    
    // Wait for the page to load
    await page.waitForSelector('h1:has-text("Profile Settings")');
  });

  test('should render profile page with correct layout', async ({ page }) => {
    // Set viewport to desktop size
    await page.setViewportSize(deviceSizes.desktop);
    
    // Take a screenshot of the initial state
    await page.screenshot({
      path: path.join(newScreenshotDir, 'profile-initial.png'),
    });
    
    // Also save to legacy directory for backward compatibility
    await page.screenshot({
      path: path.join(legacyScreenshotDir, 'profile-initial.png'),
    });

    // Verify the title
    const title = page.locator('h1');
    await expect(title).toContainText('Profile Settings');

    // Verify the description text
    const description = page.locator('p.mt-2.text-sm.text-gray-600');
    await expect(description).toContainText('Manage your account details');

    // Verify the sidebar is present
    const sidebar = page.locator('aside nav');
    await expect(sidebar).toBeVisible();

    // Verify all sidebar links are present
    const profileLink = page.locator('a[href="/account/profile"]');
    await expect(profileLink).toBeVisible();
    await expect(profileLink).toHaveClass(/bg-pink-100/); // Active link

    const passwordLink = page.locator('a[href="/account/password"]');
    await expect(passwordLink).toBeVisible();

    const signOutLink = page.locator('a[href="/auth/signout"]');
    await expect(signOutLink).toBeVisible();

    // Verify the form is present
    const form = page.locator('form');
    await expect(form).toBeVisible();

    // Verify form fields
    const nameInput = page.locator('input#name');
    await expect(nameInput).toBeVisible();
    await expect(nameInput).toHaveValue('Test User');

    const usernameInput = page.locator('input#username');
    await expect(usernameInput).toBeVisible();
    await expect(usernameInput).toHaveValue('testuser');

    const emailInput = page.locator('input#email');
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toHaveValue('test@example.com');

    // Verify submit button
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toHaveText('Update Account');

    // Take a screenshot after verification
    await page.screenshot({
      path: path.join(newScreenshotDir, 'profile-verified.png'),
    });
  });

  test('should show responsive layout on different devices', async ({ page }) => {
    // Test mobile layout
    await page.setViewportSize(deviceSizes.mobile);
    await page.screenshot({
      path: path.join(newScreenshotDir, 'profile-mobile.png'),
    });
    await page.screenshot({
      path: path.join(legacyScreenshotDir, 'profile-mobile.png'),
    });

    // Verify sidebar stacks above content on mobile
    const layout = page.locator('.flex.flex-col.md\\:flex-row');
    await expect(layout).toBeVisible();

    // Take another screenshot after scrolling to see the form on mobile
    await page.evaluate(() => window.scrollTo(0, 300));
    await page.screenshot({
      path: path.join(newScreenshotDir, 'profile-mobile-scrolled.png'),
    });
    await page.screenshot({
      path: path.join(legacyScreenshotDir, 'profile-mobile-scrolled.png'),
    });

    // Test tablet layout
    await page.setViewportSize(deviceSizes.tablet);
    await page.evaluate(() => window.scrollTo(0, 0)); // Reset scroll
    await page.screenshot({
      path: path.join(newScreenshotDir, 'profile-tablet.png'),
    });
    await page.screenshot({
      path: path.join(legacyScreenshotDir, 'profile-tablet.png'),
    });

    // Test landscape mobile
    await page.setViewportSize({ width: deviceSizes.mobile.height, height: deviceSizes.mobile.width });
    await page.screenshot({
      path: path.join(newScreenshotDir, 'profile-mobile-landscape.png'),
    });
    await page.screenshot({
      path: path.join(legacyScreenshotDir, 'profile-mobile-landscape.png'),
    });
  });

  test('should handle form submission successfully', async ({ page }) => {
    // Set viewport to desktop size
    await page.setViewportSize(deviceSizes.desktop);
    
    // Mock the API PUT request
    await page.route('/api/user/test-user-123', (route) => {
      const method = route.request().method();
      if (method === 'PUT') {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true }),
        });
      } else {
        // Pass through GET requests
        route.continue();
      }
    });

    // Change form values
    await page.fill('input#name', 'Updated User');
    await page.fill('input#email', 'updated@example.com');

    // Take a screenshot of the filled form
    await page.screenshot({
      path: path.join(newScreenshotDir, 'profile-filled.png'),
    });

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for success message (toast)
    await page.waitForSelector('div:has-text("Account updated successfully")');

    // Take a screenshot of the success state
    await page.screenshot({
      path: path.join(newScreenshotDir, 'profile-success.png'),
    });
  });

  test('should handle form submission errors', async ({ page }) => {
    // Set viewport to desktop size
    await page.setViewportSize(deviceSizes.desktop);
    
    // Mock a failed API PUT request
    await page.route('/api/user/test-user-123', (route) => {
      const method = route.request().method();
      if (method === 'PUT') {
        route.fulfill({
          status: 400,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Failed to update account' }),
        });
      } else {
        // Pass through GET requests
        route.continue();
      }
    });

    // Change form values
    await page.fill('input#name', 'Will Fail');
    
    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for error message (toast)
    await page.waitForSelector('div:has-text("Failed to update account")');

    // Take a screenshot of the error state
    await page.screenshot({
      path: path.join(newScreenshotDir, 'profile-error.png'),
    });
  });
}); 