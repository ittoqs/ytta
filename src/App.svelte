<script lang="ts">
  import { onMount } from 'svelte';
  import Navbar from './components/Navbar.svelte';
  import Footer from './components/Footer.svelte';
  import LandingPage from './components/LandingPage.svelte';
  import WizardStep1 from './components/WizardStep1.svelte';
  import WizardStep2 from './components/WizardStep2.svelte';
  import WizardStep3 from './components/WizardStep3.svelte';
  import ResultsPage from './components/ResultsPage.svelte';
  import LaptopDetailModal from './components/LaptopDetailModal.svelte';
  import CompareView from './components/CompareView.svelte';
  import FavoritesView from './components/FavoritesView.svelte';
  import CustomModal from './components/CustomModal.svelte';

  import rawLaptops from './data/laptops.json';
  import {
    computeRecommendations,
    type Laptop,
    type RecommendationResult,
    type UserPreferences
  } from './lib/spkEngine';

  const laptops = rawLaptops as Laptop[];

  let activeTab = 'home'; // 'home' | 'wizard' | 'favorites' | 'compare'
  let wizardStep = 1; // 1, 2, 3, 4 (4 is results)

  let preferences: UserPreferences = {
    profession: 'Kreator Konten',
    usage_intensity: 'Sedang',
    portability_needed: false,
    budget_range: 'All',
    gaming_needed: false,
    priority: 'Performa',
    custom_specs: {
      min_ram: 8,
      min_storage: 256,
      min_cpu_cores: 4,
      min_gpu_vram: 0
    }
  };

  let results: RecommendationResult[] = [];
  let favorites: string[] = [];
  let compareList: string[] = [];
  let selectedLaptopId: string | null = null;

  // Custom Modal Alert State
  let isAlertModalOpen = false;
  let alertModalTitle = 'Perhatian';
  let alertModalMessage = '';
  let alertModalType: 'info' | 'warning' | 'success' = 'warning';

  onMount(() => {
    const savedFavs = localStorage.getItem('sla_favorites');
    if (savedFavs) {
      try { favorites = JSON.parse(savedFavs); } catch (e) {}
    }

    const savedCompare = localStorage.getItem('sla_compare');
    if (savedCompare) {
      try { compareList = JSON.parse(savedCompare); } catch (e) {}
    }

    // Initial calculation
    results = computeRecommendations(laptops, preferences);
  });

  function saveFavs() {
    localStorage.setItem('sla_favorites', JSON.stringify(favorites));
  }

  function saveCompare() {
    localStorage.setItem('sla_compare', JSON.stringify(compareList));
  }

  function toggleFavorite(id: string) {
    if (favorites.includes(id)) {
      favorites = favorites.filter(item => item !== id);
    } else {
      favorites = [...favorites, id];
    }
    saveFavs();
  }

  function toggleCompare(id: string) {
    if (compareList.includes(id)) {
      compareList = compareList.filter(item => item !== id);
    } else {
      if (compareList.length >= 3) {
        alertModalTitle = 'Batas Maksimum Pembanding';
        alertModalMessage = 'Maksimal 3 laptop untuk dibandingkan secara bersamaan. Hapus salah satu laptop terlebih dahulu untuk menambahkan lainnya.';
        alertModalType = 'warning';
        isAlertModalOpen = true;
        return;
      }
      compareList = [...compareList, id];
    }
    saveCompare();
  }

  function handleSelectTab(tab: string) {
    activeTab = tab;
    if (tab === 'wizard') {
      if (wizardStep === 4) wizardStep = 1;
    }
  }

  function startWizard() {
    activeTab = 'wizard';
    wizardStep = 1;
  }

  function selectProfessionAndDirect(prof: string) {
    preferences.profession = prof;
    results = computeRecommendations(laptops, preferences);
    activeTab = 'wizard';
    wizardStep = 4; // Go straight to results
  }

  function runSPKAndShowResults() {
    results = computeRecommendations(laptops, preferences);
    wizardStep = 4;
  }

  function resetWizard() {
    wizardStep = 1;
    preferences = {
      profession: 'Kreator Konten',
      usage_intensity: 'Sedang',
      portability_needed: false,
      budget_range: 'All',
      gaming_needed: false,
      priority: 'Performa',
      custom_specs: {
        min_ram: 8,
        min_storage: 256,
        min_cpu_cores: 4,
        min_gpu_vram: 0
      }
    };
    results = computeRecommendations(laptops, preferences);
  }

  $: selectedLaptop = laptops.find(l => l.id === selectedLaptopId);
  $: selectedLaptopRec = results.find(r => r.laptop.id === selectedLaptopId);
  $: favoriteLaptops = laptops.filter(l => favorites.includes(l.id));
  $: compareLaptops = laptops.filter(l => compareList.includes(l.id));
</script>

<div class="min-h-screen flex flex-col bg-[#F0F2F5] text-[#0A0A0A] font-sans antialiased">
  <Navbar
    favoritesCount={favorites.length}
    compareCount={compareList.length}
    {activeTab}
    onSelectTab={handleSelectTab}
  />

  <main class="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
    {#if activeTab === 'home'}
      <LandingPage
        onStartWizard={startWizard}
        onSelectProfession={selectProfessionAndDirect}
      />
    {:else if activeTab === 'wizard'}
      <div class="space-y-6">
        {#if wizardStep === 1}
          <WizardStep1
            bind:preferences
            onNextStep={() => wizardStep = 2}
            onDirectResults={runSPKAndShowResults}
          />
        {:else if wizardStep === 2}
          <WizardStep2
            bind:preferences
            onPrevStep={() => wizardStep = 1}
            onNextStep={() => wizardStep = 3}
          />
        {:else if wizardStep === 3}
          <WizardStep3
            bind:preferences
            onPrevStep={() => wizardStep = 2}
            onSubmit={runSPKAndShowResults}
          />
        {:else if wizardStep === 4}
          <ResultsPage
            {results}
            {preferences}
            {favorites}
            {compareList}
            onToggleFavorite={toggleFavorite}
            onToggleCompare={toggleCompare}
            onSelectLaptop={(id) => selectedLaptopId = id}
            onReset={resetWizard}
          />
        {/if}
      </div>
    {:else if activeTab === 'compare'}
      <CompareView
        laptops={compareLaptops}
        onRemoveFromCompare={toggleCompare}
        onClearCompare={() => { compareList = []; saveCompare(); }}
      />
    {:else if activeTab === 'favorites'}
      <FavoritesView
        laptops={favoriteLaptops}
        onRemoveFavorite={toggleFavorite}
        onSelectLaptop={(id) => selectedLaptopId = id}
      />
    {/if}
  </main>

  <Footer />

  <!-- Laptop Detail Modal -->
  {#if selectedLaptop}
    <LaptopDetailModal
      laptop={selectedLaptop}
      recResult={selectedLaptopRec}
      isFavorite={favorites.includes(selectedLaptop.id)}
      isInCompare={compareList.includes(selectedLaptop.id)}
      onClose={() => selectedLaptopId = null}
      onToggleFavorite={toggleFavorite}
      onToggleCompare={toggleCompare}
    />
  {/if}

  <!-- Custom Alert Modal -->
  <CustomModal
    isOpen={isAlertModalOpen}
    title={alertModalTitle}
    message={alertModalMessage}
    type={alertModalType}
    onClose={() => isAlertModalOpen = false}
  />
</div>
