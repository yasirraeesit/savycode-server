import express from 'express';
import mongoose from 'mongoose';
import Lead from '../models/Lead.js';
import Estimate from '../models/Estimate.js';
import Application from '../models/Application.js';

const router = express.Router();

// In-memory fallback if MongoDB instance isn't active locally
const inMemoryLeads = [];
const inMemoryEstimates = [];
const inMemoryApplications = [];

// Health check
router.get('/health', (req, res) => {
  const isMongoConnected = mongoose.connection.readyState === 1;
  const dbName = mongoose.connection.db ? mongoose.connection.db.databaseName : (process.env.DB_NAME || 'sovycode');
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'SovYCode API Gateway',
    database: isMongoConnected ? `MongoDB Connected ("${dbName}")` : 'In-Memory Fallback Active',
    dbName: isMongoConnected ? dbName : null
  });
});

// Book Discovery Call / Create Lead
router.post('/leads', async (req, res) => {
  try {
    const { name, email, service, details } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required fields.' });
    }

    const leadData = {
      name,
      email,
      service: service || 'ai',
      details: details || '',
      createdAt: new Date()
    };

    if (mongoose.connection.readyState === 1) {
      const newLead = new Lead(leadData);
      await newLead.save();
      return res.status(201).json({
        success: true,
        message: 'Discovery call request received and stored in MongoDB.',
        lead: newLead
      });
    } else {
      inMemoryLeads.push({ id: Date.now().toString(), ...leadData });
      return res.status(201).json({
        success: true,
        message: 'Discovery call request received (stored in active session store).',
        lead: leadData
      });
    }
  } catch (err) {
    console.error('Error creating lead:', err);
    res.status(500).json({ error: 'Failed to process lead request.' });
  }
});

// Get Leads (for agency dashboard)
router.get('/leads', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const leads = await Lead.find().sort({ createdAt: -1 });
      return res.json({ leads, count: leads.length });
    } else {
      return res.json({ leads: inMemoryLeads, count: inMemoryLeads.length });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve leads.' });
  }
});

// Save Scope Estimate
router.post('/estimates', async (req, res) => {
  try {
    const { projectType, urgency, estimatedWeeks, clientEmail } = req.body;
    const estData = {
      projectType,
      urgency,
      estimatedWeeks,
      clientEmail: clientEmail || '',
      createdAt: new Date()
    };

    if (mongoose.connection.readyState === 1) {
      const newEst = new Estimate(estData);
      await newEst.save();
      return res.status(201).json({ success: true, estimate: newEst });
    } else {
      inMemoryEstimates.push({ id: Date.now().toString(), ...estData });
      return res.status(201).json({ success: true, estimate: estData });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to save estimate.' });
  }
});

// Submit Career Job Application
router.post('/applications', async (req, res) => {
  try {
    const { name, email, role, githubOrLinkedin, portfolio, note } = req.body;

    if (!name || !email || !role || !githubOrLinkedin) {
      return res.status(400).json({ error: 'Name, email, target role, and GitHub/LinkedIn link are required.' });
    }

    const appData = {
      name,
      email,
      role,
      githubOrLinkedin,
      portfolio: portfolio || '',
      note: note || '',
      createdAt: new Date()
    };

    if (mongoose.connection.readyState === 1) {
      const newApp = new Application(appData);
      await newApp.save();
      return res.status(201).json({
        success: true,
        message: 'Application received and submitted to SovYCode engineering team.',
        application: newApp
      });
    } else {
      inMemoryApplications.push({ id: Date.now().toString(), ...appData });
      return res.status(201).json({
        success: true,
        message: 'Application received (stored in active session store).',
        application: appData
      });
    }
  } catch (err) {
    console.error('Error submitting application:', err);
    res.status(500).json({ error: 'Failed to process application.' });
  }
});

// Get Applications (for hiring team review)
router.get('/applications', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const apps = await Application.find().sort({ createdAt: -1 });
      return res.json({ applications: apps, count: apps.length });
    } else {
      return res.json({ applications: inMemoryApplications, count: inMemoryApplications.length });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve applications.' });
  }
});

export default router;
