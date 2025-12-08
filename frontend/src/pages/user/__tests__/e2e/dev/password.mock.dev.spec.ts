import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

// Test suite for the Password Change page
test.describe('Password Change Page Tests (Mock)', () => {
  // Configure screenshot directories with new structure
  const baseScreenshotDir = path.join(process.cwd(), 'test_screenshots');
  const newScreenshotDir = path.join(baseScreenshotDir, 'development', 'user', 'password', 'mock');
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
    // Navigate to the password change page
    await page.goto('/account/password');
    
    // Wait for the page to load
    await page.waitForSelector('h1:has-text("Change Password")');
  });

  test('should render password change page with correct layout', async ({ page }) => {
    // Set viewport to desktop size
    await page.setViewportSize(deviceSizes.desktop);
    
    // Take a screenshot of the initial state
    await page.screenshot({
      path: path.join(newScreenshotDir, 'password-initial.png'),
    });
    
    // Also save to legacy directory for backward compatibility
    await page.screenshot({
      path: path.join(legacyScreenshotDir, 'password-initial.png'),
    });

    // Verify the title
    const title = page.locator('h1');
    await expect(title).toContainText('Change Password');

    // Verify the description text
    const description = page.locator('p.mt-2.text-sm.text-gray-600');
    await expect(description).toContainText('Update your password');

    // Verify the sidebar is present
    const sidebar = page.locator('aside nav');
    await expect(sidebar).toBeVisible();

    // Verify all sidebar links are present
    const profileLink = page.locator('a[href="/account/profile"]');
    await expect(profileLink).toBeVisible();

    const passwordLink = page.locator('a[href="/account/password"]');
    await expect(passwordLink).toBeVisible();
    await expect(passwordLink).toHaveClass(/bg-pink-100/); // Active link

    const signOutLink = page.locator('a[href="/auth/signout"]');
    await expect(signOutLink).toBeVisible();

    // Verify the form is present
    const form = page.locator('form');
    await expect(form).toBeVisible();

    // Verify form fields
    const currentPasswordInput = page.locator('input#currentPassword');
    await expect(currentPasswordInput).toBeVisible();

    const newPasswordInput = page.locator('input#newPassword');
    await expect(newPasswordInput).toBeVisible();

    const confirmPasswordInput = page.locator('input#confirmPassword');
    await expect(confirmPasswordInput).toBeVisible();

    // Verify submit button
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toHaveText('Change Password');

    // Verify password tips section is present
    const passwordTips = page.locator('h3.text-sm.font-medium.text-gray-700');
    await expect(passwordTips).toBeVisible();
    await expect(passwordTips).toHaveText('Password Tips');

    // Take a screenshot after verification
    await page.screenshot({
      path: path.join(newScreenshotDir, 'password-verified.png'),
    });
  });

  test('should show responsive layout on different devices', async ({ page }) => {
    // Test mobile layout
    await page.setViewportSize(deviceSizes.mobile);
    await page.screenshot({
      path: path.join(newScreenshotDir, 'password-mobile.png'),
    });
    await page.screenshot({
      path: path.join(legacyScreenshotDir, 'password-mobile.png'),
    });

    // Verify sidebar stacks above content on mobile
    const layout = page.locator('.flex.flex-col.md\\:flex-row');
    await expect(layout).toBeVisible();

    // Take another screenshot after scrolling to see the form on mobile
    await page.evaluate(() => window.scrollTo(0, 300));
    await page.screenshot({
      path: path.join(newScreenshotDir, 'password-mobile-scrolled.png'),
    });
    await page.screenshot({
      path: path.join(legacyScreenshotDir, 'password-mobile-scrolled.png'),
    });

    // Test tablet layout
    await page.setViewportSize(deviceSizes.tablet);
    await page.evaluate(() => window.scrollTo(0, 0)); // Reset scroll
    await page.screenshot({
      path: path.join(newScreenshotDir, 'password-tablet.png'),
    });
    await page.screenshot({
      path: path.join(legacyScreenshotDir, 'password-tablet.png'),
    });

    // Test landscape mobile
    await page.setViewportSize({ width: deviceSizes.mobile.height, height: deviceSizes.mobile.width });
    await page.screenshot({
      path: path.join(newScreenshotDir, 'password-mobile-landscape.png'),
    });
    await page.screenshot({
      path: path.join(legacyScreenshotDir, 'password-mobile-landscape.png'),
    });
  });

  test('should show validation errors', async ({ page }) => {
    // Set viewport to desktop size
    await page.setViewportSize(deviceSizes.desktop);
    
    // Click submit without filling anything
    await page.click('button[type="submit"]');

    // Verify validation errors appear
    const currentPasswordError = page.locator('text=Current password is required');
    await expect(currentPasswordError).toBeVisible();

    const newPasswordError = page.locator('text=New password is required');
    await expect(newPasswordError).toBeVisible();

    // Take a screenshot of validation errors
    await page.screenshot({
      path: path.join(newScreenshotDir, 'password-validation-errors.png'),
    });

    // Fill with invalid data - password too short
    await page.fill('input#currentPassword', 'current123');
    await page.fill('input#newPassword', 'short');
    await page.fill('input#confirmPassword', 'short');
    
    // Submit again
    await page.click('button[type="submit"]');

    // Verify password length error
    const lengthError = page.locator('text=Password must be at least 8 characters');
    await expect(lengthError).toBeVisible();

    // Take a screenshot of password length error
    await page.screenshot({
      path: path.join(newScreenshotDir, 'password-length-error.png'),
    });

    // Test mobile view of validation errors
    await page.setViewportSize(deviceSizes.mobile);
    await page.screenshot({
      path: path.join(newScreenshotDir, 'password-validation-errors-mobile.png'),
    });
    await page.screenshot({
      path: path.join(legacyScreenshotDir, 'password-validation-errors-mobile.png'),
    });

    // Fill with mismatched passwords
    await page.fill('input#currentPassword', 'current123');
    await page.fill('input#newPassword', 'newpassword123');
    await page.fill('input#confirmPassword', 'different123');
    
    // Submit again
    await page.click('button[type="submit"]');

    // Verify mismatch error
    const mismatchError = page.locator('text=Passwords do not match');
    await expect(mismatchError).toBeVisible();

    // Take a screenshot of password mismatch error
    await page.screenshot({
      path: path.join(newScreenshotDir, 'password-mismatch-error.png'),
    });
  });

  test('should handle successful password change', async ({ page }) => {
    // Set viewport to desktop size
    await page.setViewportSize(deviceSizes.desktop);
    
    // Mock the API PUT request for password change
    await page.route('/api/user/test-user-123/password', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    // Fill the form with valid data
    await page.fill('input#currentPassword', 'current123');
    await page.fill('input#newPassword', 'newpassword123');
    await page.fill('input#confirmPassword', 'newpassword123');

    // Take a screenshot of filled form
    await page.screenshot({
      path: path.join(newScreenshotDir, 'password-filled.png'),
    });

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for success message (toast)
    await page.waitForSelector('div:has-text("Password updated successfully")');

    // Verify form is cleared after success
    await expect(page.locator('input#currentPassword')).toHaveValue('');
    await expect(page.locator('input#newPassword')).toHaveValue('');
    await expect(page.locator('input#confirmPassword')).toHaveValue('');

    // Take a screenshot of success state
    await page.screenshot({
      path: path.join(newScreenshotDir, 'password-success.png'),
    });

    // Test mobile view of success state
    await page.setViewportSize(deviceSizes.mobile);
    await page.screenshot({
      path: path.join(newScreenshotDir, 'password-success-mobile.png'),
    });
    await page.screenshot({
      path: path.join(legacyScreenshotDir, 'password-success-mobile.png'),
    });
  });

  test('should handle incorrect current password', async ({ page }) => {
    // Set viewport to desktop size
    await page.setViewportSize(deviceSizes.desktop);
    
    // Mock the API PUT request for password change with 401 error
    await page.route('/api/user/test-user-123/password', (route) => {
      route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Current password is incorrect' }),
      });
    });

    // Fill the form with valid but incorrect current password
    await page.fill('input#currentPassword', 'wrongpassword');
    await page.fill('input#newPassword', 'newpassword123');
    await page.fill('input#confirmPassword', 'newpassword123');

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for error message
    await page.waitForSelector('div:has-text("Current password is incorrect")');
    
    // Verify specific error message on the form
    const currentPasswordError = page.locator('text=Current password is incorrect');
    await expect(currentPasswordError).toBeVisible();

    // Take a screenshot of incorrect password error
    await page.screenshot({
      path: path.join(newScreenshotDir, 'password-incorrect-error.png'),
    });
  });
}); 