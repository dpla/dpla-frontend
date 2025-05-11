import React from "react";
import { render, screen } from "@testing-library/react";
import ExhibitionView from "../../../../components/ExhibitionsComponents/ExhibitionSection";

describe("ExhibitionView", () => {
  jest.mock("next/router", () => ({
    useRouter: () => ({
      query: {
        exhibitionSlug: "test-exhibition",
        sectionSlug: "test-section",
        subsectionSlug: "test-subsection",
      },
    }),
    withRouter: (Component) => {
      Component.defaultProps = {
        ...Component.defaultProps,
        router: {
          query: {
            exhibitionSlug: "test-exhibition",
            sectionSlug: "test-section",
            subsectionSlug: "test-subsection",
          },
        },
      };
      return Component;
    },
  }));

  const mockProps = {
    exhibitionTitle: "Test Exhibition",
    section: {
      title: "Test Section",
      content: "Test section content",
    },
    subsection: {
      title: "Test Subsection",
      content: "Test subsection content",
      page_blocks: [
        {
          id: "block1",
          text: "Test block text",
          isActive: true,
          fileType: "still_image",
          originalUrl: "test-image.jpg",
          fullsizeImgUrl: "test-image.jpg",
          thumbnailUrl: "test-thumb.jpg",
          attachments: [
            {
              caption: "Test caption",
            },
          ],
          dplaItemId: "12345",
          dplaItemJson: {
            docs: [
              {
                sourceResource: {
                  title: "Test Item",
                },
                dataProvider: {
                  name: "Test Provider",
                },
                provider: {
                  name: "Test Partner",
                },
              },
            ],
          },
        },
      ],
    },
    sectionMap: [
      { title: "Section 1", slug: "section-1" },
      { title: "Section 2", slug: "section-2" },
    ],
    subsectionMap: [
      { title: "Subsection 1", slug: "subsection-1" },
      { title: "Subsection 2", slug: "subsection-2" },
    ],
    exhibitionSlug: "test-exhibition",
    nextQueryParams: { section: "next-section", subsection: "next-subsection" },
    nextSubsectionTitle: "Next Subsection",
    previousQueryParams: {
      section: "prev-section",
      subsection: "prev-subsection",
    },
  };

  it("renders the exhibition title in the header", () => {
    render(<ExhibitionView {...mockProps} />);
    expect(screen.getByText("Test Exhibition")).toBeInTheDocument();
  });

  it("renders the Body component with correct props", () => {
    render(<ExhibitionView {...mockProps} />);
    const exhibitPage = screen.getByRole("main");
    expect(exhibitPage).toBeInTheDocument();
  });

  it("renders the navigation components", () => {
    render(<ExhibitionView {...mockProps} />);
    // Check for next subsection title which is displayed in the FooterNav
    expect(screen.getByText("Next Subsection")).toBeInTheDocument();
  });
});
