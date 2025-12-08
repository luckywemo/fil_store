# User Account Management Testing with Playwright

This document describes how to test the user account management layout components using Playwright's screenshot utility.

## Overview

The user account management section consists of the following components:
- Account Layout (`account-layout.tsx`)
- Account Sidebar (`account-sidebar.tsx`)
- Account Form (`account-form.tsx`)
- Password Form (`password-form.tsx`)

These components create a unified interface for users to manage their profiles and update their passwords.

## Screenshot Utility

Playwright's screenshot utility is configured in the project to:
1. Capture screenshots during test execution
2. Store them in predefined directory structures
3. Help with visual regression testing

### Screenshot Directory Structure

Screenshots are saved in two formats:
- **New Structure**: `test_screenshots/development/user/[test-type]/[mock|real]`
- **Legacy Structure**: `test_screenshots/user` (for backward compatibility)

The screenshot directories are automatically created by the Playwright configuration.

## Test Approach

### 1. Visual Testing
Tests verify that the component renders correctly by capturing screenshots at key states:
- Initial state (component loaded)
- Interactive states (hover, focus, etc.)
- Success/error states (form submission results)

### 2. Functional Testing
Tests simulate user interactions to verify that:
- Forms submit correctly
- Validation works as expected
- Navigation between sections works properly
- Error states are handled properly

## Setting Up User Component Tests

To create a test for a user component:

1. Create a test file with naming convention: `[component-name].[mock|real].dev.spec.ts`
2. Configure screenshots to save to the appropriate directory
3. Test both visual appearance and functional behavior

### Example Test Structure

```typescript
import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('User Account Profile Page Tests', () => {
  // Configure screenshot directories
  const baseScreenshotDir = path.join(process.cwd(), 'test_screenshots');
  const newScreenshotDir = path.join(baseScreenshotDir, 'development', 'user', 'profile', 'mock');
  const legacyScreenshotDir = path.join(baseScreenshotDir, 'user');

  test.beforeEach(async ({ page }) => {
    // Navigate to the profile page
    await page.goto('/account/profile');
  });

  test('should render profile form with correct layout', async ({ page }) => {
    // Take screenshot of initial state
    await page.screenshot({ 
      path: path.join(newScreenshotDir, 'profile-initial.png') 
    });
    
    // Verify key elements are visible
    const title = page.locator('h1');
    await expect(title).toContainText('Profile Settings');
    
    const form = page.locator('form');
    await expect(form).toBeVisible();
    
    // Verify sidebar is present and working
    const sidebar = page.locator('nav');
    await expect(sidebar).toBeVisible();
    
    // Take screenshot after verification
    await page.screenshot({ 
      path: path.join(newScreenshotDir, 'profile-verified.png')
    });
  });

  test('should handle form submission', async ({ page }) => {
    // Mock API response
    await page.route('/api/user/*', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true })
      });
    });
    
    // Fill form fields
    await page.fill('input[name="name"]', 'Updated Name');
    await page.fill('input[name="email"]', 'updated@example.com');
    
    // Take screenshot of filled form
    await page.screenshot({ 
      path: path.join(newScreenshotDir, 'profile-filled.png')
    });
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Verify success toast appears
    const toast = page.locator('.sonner-toast');
    await expect(toast).toBeVisible();
    await expect(toast).toContainText('Account updated successfully');
    
    // Take screenshot of success state
    await page.screenshot({ 
      path: path.join(newScreenshotDir, 'profile-success.png')
    });
  });
});
```

## Running Tests

To run user component tests:

```bash
npm test -- "user/__tests__/e2e/dev/profile"
```

To run all user component tests:

```bash
npm test -- "user/__tests__/e2e"
```

To run tests in debug mode (with UI):

```bash
npm test -- "user/__tests__/e2e" --debug
```

## Test Coverage

Tests should cover:

1. **Layout Tests**
   - Responsive behavior (desktop, tablet, mobile)
   - Correct rendering of all elements
   - Navigation between account sections

2. **Form Tests**
   - Form validation
   - Error handling
   - Success messages
   - API interaction (mocked)

3. **Accessibility Tests**
   - Keyboard navigation
   - Screen reader compatibility
   - Focus management

## Visual Regression Testing

When making changes to components, compare new screenshots with previous ones to:
1. Verify intentional visual changes
2. Detect unintentional regressions 