import { UserIcon } from "lucide-react";
import { title } from "process";
import { defineType, defineField } from "sanity";

export const project = defineType({
    name: "project",
    title:  "Project",
    type: "document",
    fields: [
        defineField({
            name: 'title',
            type:'string',
        }),
        defineField({
            name: 'slug',
            type:'slug',
            options: {
                source:'title'
            }
        }),
        defineField({
            name: 'author',
            type:'reference',
            to: {
                type: 'author'
            }
        }),
        defineField({
            name: 'views',
            type:'number',
        }),
        defineField({
            name: 'description',
            type:'text',
        }),
        defineField({
            name: 'category',
            type:'string',
            validation: (Rule) => Rule.min(1).max(20).required().error('Please enter a category'),
        }),
        defineField({
            name: 'image',
            type:'url',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'tagline',
            type:'markdown',
        }),
        {
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
              {
                type: 'block',
              },
              {
                type: 'image',
                fields: [
                  {
                    type: 'text',
                    name: 'alt',
                    title: 'Alternative text',
                    description: `Some of your visitors cannot see images, 
                      be they blind, color-blind, low-sighted; 
                      alternative text is of great help for those 
                      people that can rely on it to have a good idea of 
                      what\'s on your page.`
                  }
                ]
              }
              
            ]
          },
        
    ],

})