import { render, screen, fireEvent } from '@testing-library/react';
// import type { RenderResult } from '@testing-library/react';
import VillaDetails from '../VillaDetails';

type VillaDataType = {
  description: string;
  amenities: string;
};

const mockVillaData: VillaDataType = {
  description: 'This is a description',
  amenities: 'Amenity 1, Amenity 2, Amenity 3',
};

describe('VillaDetails', () => {
  //let renderResult: RenderResult;

  beforeEach(() => {
    render(<VillaDetails villaData={mockVillaData} />);
  });

  test('should render description content when "description" heading is active', () => {
    fireEvent.click(screen.getByText('description'));
    const descriptionElement = screen.getByText(mockVillaData.description);
    expect<HTMLElement>(descriptionElement).toBeInTheDocument();
  });

  test('should render amenities content when "amenities" heading is active', () => {
    fireEvent.click(screen.getByText('amenities'));
    const amenityElements = screen.getAllByRole('listitem');
    expect(amenityElements.length).toBe(3);
  });

  test('should render reviews content when "reviews" heading is active', () => {
    fireEvent.click(screen.getByText('reviews'));
    const reviewsElement = screen.getByText('These are some reviews');
    expect(reviewsElement).toBeInTheDocument();
  });
});
