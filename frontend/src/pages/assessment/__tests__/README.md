
# Assessment Tests

## Overview
This directory contains comprehensive tests for the Dottie menstrual assessment flow. The tests are designed to validate both individual components and end-to-end user journeys through the assessment pathway.

## Test Structure

- **Unit Tests** (`Assessment.test.tsx`): Verify individual page components render correctly
- **Integration Tests** (`Assessment.integration.test.tsx`): Test end-to-end user flows through the assessment

## Assessment Logic Pathways

Our tests cover all possible assessment outcome pathways as defined in the `LogicTree.md`:

1. **Regular Menstrual Cycles (O4)** - Normal, healthy pattern
2. **Irregular Timing Pattern (O1)** - Cycle length outside typical range
3. **Heavy Flow Pattern (O2)** - Flow heavier or longer than typical
4. **Pain-Predominant Pattern (O3)** - Pain higher than typical
5. **Developing Pattern (O5)** - Cycles still establishing regular pattern for younger users

## Running Tests

```bash
# Run all assessment tests
npm test -- "Assessment"

# Run only unit tests
npm test -- "Assessment.test"

# Run only integration tests
npm test -- "Assessment.integration"

# Run specific test pathways
npm test -- "Assessment/developing"
```

## Test Approach

### Unit Tests
- Test component rendering
- Verify presence of key UI elements
- Test in isolation with mocked dependencies

### Integration Tests
- Simulate user interactions (clicking, form input)
- Test navigation between assessment pages
- Verify correct outcomes based on user selections
- Test the complete assessment flow including edge cases

## Maintenance Guidelines

1. When modifying assessment pages, update corresponding tests
2. If changing selectors or text, ensure tests use the same selectors
3. When adding new assessment pathways, add corresponding integration tests
4. For UI changes, run visual regression tests if available

## Common Issues

- Multiple elements with same text: Use `getAllByText()` instead of `getByText()`
- Radio buttons: Target labels with `getByLabelText()` or use `getAllByRole('radio')`
- Checkboxes for symptoms: Target the containing div rather than just the label

## Future Improvements

- Add more specific assertions for result page content
- Consider data-testid attributes for more stable selectors
- Add mock API tests for result submission
