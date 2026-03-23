'use client';

export default function SkillsAndToolsSection() {
  const designSkills = [
    'UX Research',
    'User Flow',
    'Prototyping',
    'Wireframes',
    'Visual UI Design',
    'Responsive Design',
    'UX Writing',
    'Dashboard Design',
  ];

  const tools = [
    'Figma',
    'Adobe XD',
    'Microsoft Word',
    'Microsoft Excel',
    'Photoshop',
  ];

  return (
    <section className="py-5 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto py-8">
        <h2 className="text-xl md:text-5xl font-bold text-foreground mb-4 font-heading text-center lg:text-left">Skills & Tools</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Design Skills */}
          <div className="my-8">
    
            <h2 className="text-base lg:text-2xl md:text-[28px] font-bold text-foreground mb-8 font-heading">
              Design Skills
            </h2>
            <div className="flex flex-wrap gap-3">
              {designSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-6 py-3 rounded-full font-medium text-base font-body transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: '#7C4DFF80',
                    color: '#E0D4FF',
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Tools I Use */}
          <div  className="my-8">
            <h2 className="text-base lg:text-2xl md:text-[28px] font-bold text-foreground mb-8 font-heading">
              Tools I Use
            </h2>
            <div className="flex flex-wrap gap-3">
              {tools.map((tool, index) => (
                <span
                  key={index}
                  className="px-6 py-3 rounded-full font-medium text-base font-body transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: '#FF4DE7',
                    color: '#FFFFFF',
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
